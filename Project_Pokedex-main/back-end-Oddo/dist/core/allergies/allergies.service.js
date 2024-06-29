"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AllergiesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllergiesService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = __importDefault(require("../../firebase/firebase.config"));
const common_2 = require("@nestjs/common");
let AllergiesService = AllergiesService_1 = class AllergiesService {
    constructor() {
        this.logger = new common_2.Logger(AllergiesService_1.name);
    }
    async addAllergy(allergy) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const result = await db.collection('allergies').add(allergy);
            return { success: true, status: common_1.HttpStatus.CREATED, data: { id: result.id, ...allergy } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to add allergy');
        }
    }
    async getAllAllergies() {
        try {
            const db = firebase_config_1.default.getFirestore();
            const snapshot = await db.collection('allergies').get();
            const allergies = [];
            snapshot.forEach(doc => {
                allergies.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, status: common_1.HttpStatus.OK, data: allergies };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch allergies');
        }
    }
    async getAllergyById(id) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const doc = await db.collection('allergies').doc(id).get();
            if (!doc.exists) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND, message: 'Allergy not found' };
            }
            return { success: true, status: common_1.HttpStatus.OK, data: { id: doc.id, ...doc.data() } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch allergy');
        }
    }
    async updateAllergy(id, updatedAllergy) {
        try {
            const db = firebase_config_1.default.getFirestore();
            await db.collection('allergies').doc(id).update(updatedAllergy);
            return { success: true, status: common_1.HttpStatus.OK, data: { id, ...updatedAllergy } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to update allergy');
        }
    }
    async deleteAllergy(id) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const doc = await db.collection('allergies').doc(id).get();
            if (!doc.exists) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND, message: 'Allergy not found' };
            }
            await db.collection('allergies').doc(id).delete();
            return { success: true, status: common_1.HttpStatus.OK, data: { id, ...doc.data() } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to delete allergy');
        }
    }
};
exports.AllergiesService = AllergiesService;
exports.AllergiesService = AllergiesService = AllergiesService_1 = __decorate([
    (0, common_1.Injectable)()
], AllergiesService);
//# sourceMappingURL=allergies.service.js.map