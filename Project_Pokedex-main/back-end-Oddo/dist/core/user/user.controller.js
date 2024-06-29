"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const user_auth_dto_1 = require("./user.auth.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async registerUser(res, userProfile) {
        console.log('Received add user request for user!');
        const result = await this.userService.registerUser(userProfile);
        return res.status(result.status).send(result);
    }
    async loginUser(res, loginDto) {
        console.log(`Received Login request`);
        const result = await this.userService.loginUser(loginDto);
        return res.status(result.status).send(result);
    }
    async resetPassword(res, loginDto) {
        console.log(`Received reset password's request`);
        const result = await this.userService.resetPassword(loginDto);
        return res.status(result.status).send(result);
    }
    async updateUser(res, userProfile) {
        console.log('Received update user request for user!');
        const result = await this.userService.updateUserProfile(userProfile);
        return res.status(result.status).send(result);
    }
    async getActiveStudents(res, pageNo = 1) {
        console.log('Received get All user request');
        const result = await this.userService.getAllUsers(pageNo);
        return res.status(result.status).send(result);
    }
    async getUser(res, mobileNumber) {
        console.log('Received get user request for user: ' + mobileNumber);
        const result = await this.userService.getUserProfile(mobileNumber);
        return res.status(result.status).send(result);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_auth_dto_1.UserAuthDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Post)('resetPassword'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_auth_dto_1.UserAuthDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('pageNo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getActiveStudents", null);
__decorate([
    (0, common_1.Get)('/:mobileNumber'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('mobileNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map