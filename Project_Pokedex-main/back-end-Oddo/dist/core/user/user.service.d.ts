import { HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "./user.dto";
import { UserAuthDto } from "./user.auth.dto";
import { UserSummaryRes } from "./user.res";
export declare class UserService {
    registerUser(userProfile: CreateUserDto): Promise<{
        success: boolean;
        status: HttpStatus;
        data: {
            token: string;
        };
    }>;
    loginUser(loginDto: UserAuthDto): Promise<{
        error: boolean;
        status: HttpStatus;
        json: string;
        success?: undefined;
        data?: undefined;
    } | {
        success: boolean;
        status: HttpStatus;
        data: {
            token: string;
            mobileNumber: string;
        };
        error?: undefined;
        json?: undefined;
    }>;
    validateUserLogin(loginDto: UserAuthDto): Promise<{
        error: boolean;
        status: HttpStatus;
        json: string;
        success?: undefined;
        data?: undefined;
    } | {
        success: boolean;
        status: HttpStatus;
        data: {
            token: string;
            mobileNumber: string;
        };
        error?: undefined;
        json?: undefined;
    }>;
    resetPassword(loginDto: UserAuthDto): Promise<{
        success: boolean;
        status: HttpStatus;
        data: {
            token: string;
        };
        error?: undefined;
        json?: undefined;
    } | {
        error: boolean;
        status: HttpStatus;
        json: any;
        success?: undefined;
        data?: undefined;
    }>;
    updateUserProfile(userProfileRequest: CreateUserDto): Promise<{
        success: boolean;
        status: HttpStatus;
        data: {};
    }>;
    updateUserAuth(userAuthDto: UserAuthDto): Promise<UserAuthDto>;
    getAllUsers(pageNo: number): Promise<{
        success: boolean;
        status: HttpStatus;
        data: {
            count: any;
            users: UserSummaryRes[];
        };
    }>;
    getUserProfile(mobileNumber: string): Promise<{
        success: boolean;
        status: HttpStatus;
        data: {
            user: UserSummaryRes;
            count: number;
        };
    }>;
    isUserExists(mobileNumber: string): Promise<boolean>;
    addUserAuth(userAuthDto: UserAuthDto): Promise<UserAuthDto>;
    addUserProfile(userProfile: CreateUserDto): Promise<CreateUserDto>;
    getUserAuth(mobileNumber: string): Promise<UserAuthDto>;
    validatePassword(password: any, hash: any): Promise<boolean>;
    getUserProfileByEmail(email: string): Promise<CreateUserDto>;
    getUserProfileByMobileNumber(mobileNumber: string): Promise<{
        userProfile: any;
        id?: undefined;
    } | {
        userProfile: CreateUserDto;
        id: string;
    }>;
    validateUser(email: string): Promise<CreateUserDto>;
    updateUser(userProfile: CreateUserDto): Promise<void>;
    generateJWT(payload: any): string;
    mapToUserSummaryRes(id: any, data: any): Promise<UserSummaryRes>;
}
