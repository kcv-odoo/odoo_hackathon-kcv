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
exports.HealthGoalsController = void 0;
const common_1 = require("@nestjs/common");
const health_goals_service_1 = require("./health-goals.service");
let HealthGoalsController = class HealthGoalsController {
    constructor(healthGoalsService) {
        this.healthGoalsService = healthGoalsService;
    }
    async addHealthGoal(goal, res) {
        try {
            const result = await this.healthGoalsService.addHealthGoal(goal);
            return res.status(result.status).send(result);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to add health goal');
        }
    }
    async getAllHealthGoals(res) {
        try {
            const goals = await this.healthGoalsService.getAllHealthGoals();
            return res.status(goals.status).send(goals);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch health goals');
        }
    }
    async getHealthGoalById(id, res) {
        try {
            const goal = await this.healthGoalsService.getHealthGoalById(id);
            if (!goal.success) {
                throw new common_1.InternalServerErrorException('Health goal not found');
            }
            return res.status(goal.status).send(goal);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch health goal');
        }
    }
    async updateHealthGoal(id, updatedGoal, res) {
        try {
            const result = await this.healthGoalsService.updateHealthGoal(id, updatedGoal);
            return res.status(result.status).send(result);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update health goal');
        }
    }
    async deleteHealthGoal(id, res) {
        try {
            const result = await this.healthGoalsService.deleteHealthGoal(id);
            if (!result.success) {
                throw new common_1.InternalServerErrorException('Health goal not found');
            }
            return res.status(result.status).send(result);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete health goal');
        }
    }
};
exports.HealthGoalsController = HealthGoalsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HealthGoalsController.prototype, "addHealthGoal", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HealthGoalsController.prototype, "getAllHealthGoals", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HealthGoalsController.prototype, "getHealthGoalById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], HealthGoalsController.prototype, "updateHealthGoal", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HealthGoalsController.prototype, "deleteHealthGoal", null);
exports.HealthGoalsController = HealthGoalsController = __decorate([
    (0, common_1.Controller)('health-goals'),
    __metadata("design:paramtypes", [health_goals_service_1.HealthGoalsService])
], HealthGoalsController);
//# sourceMappingURL=health-goals.controller.js.map