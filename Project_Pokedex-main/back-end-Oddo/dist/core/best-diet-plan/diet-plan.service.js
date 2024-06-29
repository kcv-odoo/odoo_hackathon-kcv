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
var DietPlanService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietPlanService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = __importDefault(require("../../firebase/firebase.config"));
const common_2 = require("@nestjs/common");
let DietPlanService = DietPlanService_1 = class DietPlanService {
    constructor() {
        this.logger = new common_2.Logger(DietPlanService_1.name);
    }
    async createBestDietPlan(bestDietPlan) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const result = await db.collection('best-diet-plans').add(bestDietPlan);
            return { success: true, status: common_1.HttpStatus.CREATED, data: { id: result.id, ...bestDietPlan } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to create best diet plan');
        }
    }
    async getAllBestDietPlans() {
        try {
            const db = firebase_config_1.default.getFirestore();
            const snapshot = await db.collection('best-diet-plans').get();
            const dietPlans = [];
            snapshot.forEach(doc => {
                dietPlans.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, status: common_1.HttpStatus.OK, data: dietPlans };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch best diet plans');
        }
    }
    async getBestDietPlanById(dietPlanId) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const doc = await db.collection('best-diet-plans').doc(dietPlanId).get();
            if (!doc.exists) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND, message: 'Best diet plan not found' };
            }
            return { success: true, status: common_1.HttpStatus.OK, data: { id: doc.id, ...doc.data() } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch best diet plan');
        }
    }
    async updateBestDietPlan(dietPlanId, bestDietPlan) {
        try {
            const db = firebase_config_1.default.getFirestore();
            await db.collection('best-diet-plans').doc(dietPlanId).update(bestDietPlan);
            return { success: true, status: common_1.HttpStatus.OK, data: { id: dietPlanId, ...bestDietPlan } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to update best diet plan');
        }
    }
    async deleteBestDietPlan(dietPlanId) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const doc = await db.collection('best-diet-plans').doc(dietPlanId).get();
            if (!doc.exists) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND, message: 'Best diet plan not found' };
            }
            await db.collection('best-diet-plans').doc(dietPlanId).delete();
            return { success: true, status: common_1.HttpStatus.OK, data: { id: dietPlanId, ...doc.data() } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to delete best diet plan');
        }
    }
};
exports.DietPlanService = DietPlanService;
exports.DietPlanService = DietPlanService = DietPlanService_1 = __decorate([
    (0, common_1.Injectable)()
], DietPlanService);
//# sourceMappingURL=diet-plan.service.js.map