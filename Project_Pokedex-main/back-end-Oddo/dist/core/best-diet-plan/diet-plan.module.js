"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietPlanModule = void 0;
const common_1 = require("@nestjs/common");
const diet_plan_service_1 = require("./diet-plan.service");
const diet_plan_controller_1 = require("./diet-plan.controller");
let DietPlanModule = class DietPlanModule {
};
exports.DietPlanModule = DietPlanModule;
exports.DietPlanModule = DietPlanModule = __decorate([
    (0, common_1.Module)({
        providers: [diet_plan_service_1.DietPlanService],
        controllers: [diet_plan_controller_1.DietPlanController],
    })
], DietPlanModule);
//# sourceMappingURL=diet-plan.module.js.map