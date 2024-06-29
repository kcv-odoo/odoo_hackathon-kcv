"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = __importDefault(require("../../firebase/firebase.config"));
const constrats_1 = require("../../common/constrats");
const utills_1 = require("../../common/utills");
const constrats_2 = require("../../common/constrats");
const jwt = __importStar(require("jsonwebtoken"));
let UserService = class UserService {
    async registerUser(userProfile) {
        const isUserExists = await this.isUserExists(userProfile.mobileNumber);
        if (isUserExists) {
            console.error('User already exists!');
            throw new common_1.BadRequestException("User account with this email/phone number already exists!");
        }
        console.log(userProfile);
        const userAuth = await this.addUserAuth({
            mobileNumber: userProfile.mobileNumber,
            password: userProfile.password
        });
        const tokenForEmail = (0, utills_1.hashToken)(Math.floor(1000 + Math.random() * 9000).toString());
        console.log(tokenForEmail);
        const userDeatiles = await this.addUserProfile({
            email: userProfile.email,
            name: userProfile.name,
            mobileNumber: userProfile.mobileNumber,
            age: userProfile.age,
            gender: userProfile.gender,
            weight: userProfile.weight,
            height: userProfile.height,
            dieataryPrefrencees: userProfile.dieataryPrefrencees,
            allergies: userProfile.allergies,
            healthGoals: userProfile.healthGoals,
            verifyToken: tokenForEmail,
            verifyTokenExpiry: new Date(Date.now() + 2000 * 86400),
        });
        delete userProfile.mobileNumber;
        const token = this.generateJWT(userProfile);
        return { "success": true, "status": common_1.HttpStatus.OK, "data": { "token": token } };
    }
    async loginUser(loginDto) {
        const isUserExists = await this.isUserExists(loginDto.mobileNumber);
        if (!isUserExists) {
            console.error('User doesnt exists!');
            throw new common_1.BadRequestException("User doesnt exists!");
        }
        const response = await this.validateUserLogin(loginDto);
        if (response.error) {
            switch (response.status) {
                case common_1.HttpStatus.BAD_REQUEST:
                    throw new common_1.BadRequestException(response.json);
                case common_1.HttpStatus.CONFLICT:
                    throw new common_1.ConflictException(response.json);
            }
        }
        return response;
    }
    async validateUserLogin(loginDto) {
        try {
            const userAuth = await this.getUserAuth(loginDto.mobileNumber);
            const isPasswordValid = await this.validatePassword(loginDto.password, userAuth.password);
            if (!isPasswordValid) {
                console.error(`Invalid password!`);
                return { "error": true, "status": common_1.HttpStatus.BAD_REQUEST, json: constrats_1.message.error.invalid_username_password };
            }
            const response = await this.getUserProfileByMobileNumber(loginDto.mobileNumber);
            delete response.userProfile.mobileNumber;
            const token = this.generateJWT(response.userProfile);
            return { "success": true, "status": common_1.HttpStatus.OK, "data": { "token": token, "mobileNumber": loginDto.mobileNumber } };
        }
        catch (error) {
            console.error(error);
            if (error.status === common_1.HttpStatus.CONFLICT)
                throw new common_1.ConflictException(constrats_1.message.error.account_pending_verification);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async resetPassword(loginDto) {
        try {
            let userAuth = await this.getUserAuth(loginDto.mobileNumber);
            const isDuplicatePassword = await this.validatePassword(loginDto.password, userAuth.password);
            if (isDuplicatePassword) {
                console.error(constrats_1.message.error.duplicate_password);
                return { "error": true, "status": common_1.HttpStatus.INTERNAL_SERVER_ERROR, json: constrats_1.message.error.duplicate_password };
            }
            userAuth = await this.updateUserAuth({
                mobileNumber: loginDto.mobileNumber,
                password: loginDto.password
            });
            const token = this.generateJWT(userAuth);
            return { "success": true, "status": common_1.HttpStatus.OK, "data": { "token": token } };
        }
        catch (error) {
            console.error(error);
            return { "error": true, "status": common_1.HttpStatus.INTERNAL_SERVER_ERROR, json: error };
        }
    }
    async updateUserProfile(userProfileRequest) {
        try {
            let { userProfile } = await this.getUserProfileByMobileNumber(userProfileRequest.mobileNumber);
            if (userProfile == null) {
                throw new common_1.NotFoundException(constrats_1.message.error.user_does_not_exists_with_mobile_number);
            }
            userProfile = { ...userProfile, ...userProfileRequest };
            await this.updateUser(userProfile);
            return { "success": true, "status": common_1.HttpStatus.OK, "data": {} };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                console.error(error.message);
                throw new common_1.NotFoundException(error.message);
            }
            else {
                console.error(`Error adding/updating user by ${userProfileRequest.mobileNumber} :`, error);
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async updateUserAuth(userAuthDto) {
        try {
            const db = firebase_config_1.default.getFirestore();
            userAuthDto.password = (0, utills_1.hashPassword)(userAuthDto.password);
            console.log(userAuthDto);
            const userQuerySnapshot = await db.collection(constrats_1.db_collections.user.auth).where("mobileNumber", "==", userAuthDto.mobileNumber).get();
            if (userQuerySnapshot.empty) {
                throw new Error('User not found');
            }
            const userDocRef = userQuerySnapshot.docs[0].ref;
            await userDocRef.update({
                password: userAuthDto.password
            });
            console.log('User authentication updated successfully:', userAuthDto);
            return userAuthDto;
        }
        catch (error) {
            console.error(error.message);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getAllUsers(pageNo) {
        const offset = (pageNo - 1) * constrats_1.pageSize;
        const users = [];
        try {
            let snapShot;
            const db = firebase_config_1.default.getFirestore();
            if (pageNo == -1) {
                snapShot = await db.collection(constrats_1.db_collections.user.profile).get();
            }
            else {
                snapShot = await db.collection(constrats_1.db_collections.user.profile)
                    .limit(constrats_1.pageSize)
                    .offset(offset)
                    .get();
            }
            if (snapShot.empty) {
                throw new common_1.NotFoundException("No user found in the database.");
            }
            for (const doc of snapShot.docs) {
                const userdata = doc.data();
                userdata.id = doc.id;
                const userResponse = await this.mapToUserSummaryRes(doc.id, userdata);
                users.push(userResponse);
            }
            return { "success": true, "status": common_1.HttpStatus.OK, "data": { "count": snapShot.size, users } };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                console.error(error.message);
                throw new common_1.NotFoundException(error.message);
            }
            else {
                console.error(error);
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async getUserProfile(mobileNumber) {
        try {
            const { userProfile, id } = await this.getUserProfileByMobileNumber(mobileNumber);
            if (userProfile == null) {
                throw new common_1.NotFoundException(constrats_1.message.error.user_does_not_exists_with_mobile_number);
            }
            return { "success": true, "status": common_1.HttpStatus.OK, "data": { "user": await this.mapToUserSummaryRes(userProfile, id), "count": 1 } };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                console.error(error.message);
                throw new common_1.NotFoundException(error.message);
            }
            else {
                console.error(`Error getting user by ${mobileNumber} :`, error);
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async isUserExists(mobileNumber) {
        const db = firebase_config_1.default.getFirestore();
        const userSnapshot = await db.collection(constrats_1.db_collections.user.auth).where('mobileNumber', '==', mobileNumber).get();
        return !userSnapshot.empty;
    }
    async addUserAuth(userAuthDto) {
        try {
            const db = firebase_config_1.default.getFirestore();
            userAuthDto.password = (0, utills_1.hashPassword)(userAuthDto.password);
            console.log(userAuthDto);
            await db.collection(constrats_1.db_collections.user.auth).add(JSON.parse(JSON.stringify(userAuthDto)));
            return userAuthDto;
        }
        catch (error) {
            console.error(error.message);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async addUserProfile(userProfile) {
        try {
            const db = firebase_config_1.default.getFirestore();
            await db.collection(constrats_1.db_collections.user.profile).add(JSON.parse(JSON.stringify(userProfile)));
            return userProfile;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getUserAuth(mobileNumber) {
        const db = firebase_config_1.default.getFirestore();
        const snapShot = await db.collection(constrats_1.db_collections.user.auth).where('mobileNumber', '==', mobileNumber).get();
        return snapShot.docs[0].data();
    }
    async validatePassword(password, hash) {
        return await (0, utills_1.comparePassword)(password, hash);
    }
    async getUserProfileByEmail(email) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const snapShot = await db.collection(constrats_1.db_collections.user.profile).where('email', '==', email).get();
            if (snapShot.empty) {
                return null;
            }
            return snapShot.docs[0].data();
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getUserProfileByMobileNumber(mobileNumber) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const snapShot = await db.collection(constrats_1.db_collections.user.profile).where('mobileNumber', '==', mobileNumber).get();
            if (snapShot.empty) {
                return { userProfile: null };
            }
            return { userProfile: snapShot.docs[0].data(), id: snapShot.docs[0].id };
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async validateUser(email) {
        try {
            const user = await this.getUserProfileByEmail(email);
            if (!user) {
                return null;
            }
            delete user.mobileNumber;
            return user;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async updateUser(userProfile) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const userRef = await db.collection(constrats_1.db_collections.user.profile).where("mobileNumber", "==", userProfile.mobileNumber).get();
            const snapShot = userRef.docs[0];
            if (!snapShot.exists) {
                throw new common_1.NotFoundException(constrats_1.message.error.user_does_not_exists);
            }
            await snapShot.ref.update({ ...userProfile });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                console.error(error.message);
                throw new common_1.NotFoundException(error.message);
            }
            else {
                console.error(error);
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    generateJWT(payload) {
        return jwt.sign(payload, constrats_2.JWT_SECRET, { expiresIn: '30d' });
    }
    async mapToUserSummaryRes(id, data) {
        const userRes = {
            id: id,
            name: data.name,
            email: data.email,
            mobileNumber: data.mobileNumber,
            age: data.age,
            gender: data.gender,
            weight: data.weight,
            height: data.height,
            dieataryPrefrencees: data.dieataryPrefrencees,
            allergies: data.allergies,
            healthGoals: data.healthGoals,
        };
        return userRes;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map