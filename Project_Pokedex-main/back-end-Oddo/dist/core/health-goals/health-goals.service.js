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
var HealthGoalsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthGoalsService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = __importDefault(require("../../firebase/firebase.config"));
const common_2 = require("@nestjs/common");
let HealthGoalsService = HealthGoalsService_1 = class HealthGoalsService {
    constructor() {
        this.logger = new common_2.Logger(HealthGoalsService_1.name);
    }
    async addHealthGoal(goal) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const result = await db.collection('health-goals').add(goal);
            return { success: true, status: common_1.HttpStatus.CREATED, data: { id: result.id, ...goal } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to add health goal');
        }
    }
    async getAllHealthGoals() {
        try {
            const db = firebase_config_1.default.getFirestore();
            const snapshot = await db.collection('health-goals').get();
            const goals = [];
            snapshot.forEach(doc => {
                goals.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, status: common_1.HttpStatus.OK, data: goals };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch health goals');
        }
    }
    async getHealthGoalById(id) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const doc = await db.collection('health-goals').doc(id).get();
            if (!doc.exists) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND, message: 'Health goal not found' };
            }
            return { success: true, status: common_1.HttpStatus.OK, data: { id: doc.id, ...doc.data() } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch health goal');
        }
    }
    async updateHealthGoal(id, updatedGoal) {
        try {
            const db = firebase_config_1.default.getFirestore();
            await db.collection('health-goals').doc(id).update(updatedGoal);
            return { success: true, status: common_1.HttpStatus.OK, data: { id, ...updatedGoal } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to update health goal');
        }
    }
    async deleteHealthGoal(id) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const doc = await db.collection('health-goals').doc(id).get();
            if (!doc.exists) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND, message: 'Health goal not found' };
            }
            await db.collection('health-goals').doc(id).delete();
            return { success: true, status: common_1.HttpStatus.OK, data: { id, ...doc.data() } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to delete health goal');
        }
    }
};
exports.HealthGoalsService = HealthGoalsService;
exports.HealthGoalsService = HealthGoalsService = HealthGoalsService_1 = __decorate([
    (0, common_1.Injectable)()
], HealthGoalsService);
//# sourceMappingURL=health-goals.service.js.map