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
exports.DietPlanController = void 0;
const common_1 = require("@nestjs/common");
const diet_plan_service_1 = require("./diet-plan.service");
let DietPlanController = class DietPlanController {
    constructor(dietPlanService) {
        this.dietPlanService = dietPlanService;
    }
    async createBestDietPlan(res, bestDietPlan) {
        const result = await this.dietPlanService.createBestDietPlan(bestDietPlan);
        return res.status(result.status).send(result);
    }
    async getAllBestDietPlans(res) {
        const result = await this.dietPlanService.getAllBestDietPlans();
        return res.status(result.status).send(result);
    }
    async getBestDietPlanById(res, id) {
        const result = await this.dietPlanService.getBestDietPlanById(id);
        return res.status(result.status).send(result);
    }
    async updateBestDietPlan(res, id, bestDietPlan) {
        const result = await this.dietPlanService.updateBestDietPlan(id, bestDietPlan);
        return res.status(result.status).send(result);
    }
    async deleteBestDietPlan(res, id) {
        const result = await this.dietPlanService.deleteBestDietPlan(id);
        return res.status(result.status).send(result);
    }
};
exports.DietPlanController = DietPlanController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DietPlanController.prototype, "createBestDietPlan", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DietPlanController.prototype, "getAllBestDietPlans", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DietPlanController.prototype, "getBestDietPlanById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], DietPlanController.prototype, "updateBestDietPlan", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DietPlanController.prototype, "deleteBestDietPlan", null);
exports.DietPlanController = DietPlanController = __decorate([
    (0, common_1.Controller)('best-diet-plans'),
    __metadata("design:paramtypes", [diet_plan_service_1.DietPlanService])
], DietPlanController);
//# sourceMappingURL=diet-plan.controller.js.map