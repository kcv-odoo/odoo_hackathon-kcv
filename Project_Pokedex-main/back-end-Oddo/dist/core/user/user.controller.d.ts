import { UserService } from "./user.service";
import { CreateUserDto } from "./user.dto";
import { UserAuthDto } from "./user.auth.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(res: any, userProfile: CreateUserDto): Promise<any>;
    loginUser(res: any, loginDto: UserAuthDto): Promise<any>;
    resetPassword(res: any, loginDto: UserAuthDto): Promise<any>;
    updateUser(res: any, userProfile: CreateUserDto): Promise<any>;
    getActiveStudents(res: any, pageNo?: number): Promise<any>;
    getUser(res: any, mobileNumber: string): Promise<any>;
}
