import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from './user.service';
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<any>;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: UserService);
    validate(payload: JwtPayload): Promise<import("./user.dto").CreateUserDto>;
}
export {};
