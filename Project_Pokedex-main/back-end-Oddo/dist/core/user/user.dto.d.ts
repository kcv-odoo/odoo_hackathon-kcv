import { UserAuthDto } from "./user.auth.dto";
export declare class CreateUserDto extends UserAuthDto {
    id?: string;
    name?: string;
    email?: string;
    mobileNumber: string;
    age?: number;
    gender?: genderEnum;
    weight?: number;
    height?: number;
    dieataryPrefrencees?: string;
    allergies?: string;
    healthGoals?: string;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
}
export declare enum genderEnum {
    Male = "male",
    Female = "female",
    Others = "others"
}
