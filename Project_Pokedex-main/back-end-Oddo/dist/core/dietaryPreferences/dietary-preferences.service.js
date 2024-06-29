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
var DietaryPreferencesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietaryPreferencesService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = __importDefault(require("../../firebase/firebase.config"));
let DietaryPreferencesService = DietaryPreferencesService_1 = class DietaryPreferencesService {
    constructor() {
        this.logger = new common_1.Logger(DietaryPreferencesService_1.name);
    }
    async addDietaryPreference(dietaryPreference) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const result = await db.collection('dietaryPreferences').add(dietaryPreference);
            return { success: true, status: common_1.HttpStatus.CREATED, data: { id: result.id, ...dietaryPreference } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to add dietary preference');
        }
    }
    async getAllDietaryPreferences() {
        try {
            const db = firebase_config_1.default.getFirestore();
            const snapshot = await db.collection('dietaryPreferences').get();
            const dietaryPreferences = [];
            snapshot.forEach(doc => {
                dietaryPreferences.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, status: common_1.HttpStatus.OK, data: dietaryPreferences };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch dietary preferences');
        }
    }
    async getDietaryPreferenceById(id) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const doc = await db.collection('dietaryPreferences').doc(id).get();
            if (!doc.exists) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND, message: 'Dietary preference not found' };
            }
            return { success: true, status: common_1.HttpStatus.OK, data: { id: doc.id, ...doc.data() } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch dietary preference');
        }
    }
    async updateDietaryPreference(id, updatedPreference) {
        try {
            const db = firebase_config_1.default.getFirestore();
            await db.collection('dietaryPreferences').doc(id).update(updatedPreference);
            return { success: true, status: common_1.HttpStatus.OK, data: { id, ...updatedPreference } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to update dietary preference');
        }
    }
    async deleteDietaryPreference(id) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const doc = await db.collection('dietaryPreferences').doc(id).get();
            if (!doc.exists) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND, message: 'Dietary preference not found' };
            }
            await db.collection('dietaryPreferences').doc(id).delete();
            return { success: true, status: common_1.HttpStatus.OK, data: { id, ...doc.data() } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to delete dietary preference');
        }
    }
};
exports.DietaryPreferencesService = DietaryPreferencesService;
exports.DietaryPreferencesService = DietaryPreferencesService = DietaryPreferencesService_1 = __decorate([
    (0, common_1.Injectable)()
], DietaryPreferencesService);
//# sourceMappingURL=dietary-preferences.service.js.map