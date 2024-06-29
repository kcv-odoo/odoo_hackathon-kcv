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
var NutritionalDatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionalDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = __importDefault(require("../../firebase/firebase.config"));
const common_2 = require("@nestjs/common");
let NutritionalDatabaseService = NutritionalDatabaseService_1 = class NutritionalDatabaseService {
    constructor() {
        this.logger = new common_2.Logger(NutritionalDatabaseService_1.name);
    }
    async addFoodItem(foodItem) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const result = await db.collection('food-items').add(foodItem);
            return { success: true, status: common_1.HttpStatus.CREATED, data: { id: result.id, ...foodItem } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to add food item');
        }
    }
    async getAllFoodItems() {
        try {
            const db = firebase_config_1.default.getFirestore();
            const snapshot = await db.collection('food-items').get();
            const foodItems = [];
            snapshot.forEach(doc => {
                foodItems.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, status: common_1.HttpStatus.OK, data: foodItems };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch food items');
        }
    }
    async getFoodItemById(foodItemId) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const doc = await db.collection('food-items').doc(foodItemId).get();
            if (!doc.exists) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND, message: 'Food item not found' };
            }
            return { success: true, status: common_1.HttpStatus.OK, data: { id: doc.id, ...doc.data() } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to fetch food item');
        }
    }
    async updateFoodItem(foodItemId, updatedFoodItem) {
        try {
            const db = firebase_config_1.default.getFirestore();
            await db.collection('food-items').doc(foodItemId).update(updatedFoodItem);
            return { success: true, status: common_1.HttpStatus.OK, data: { id: foodItemId, ...updatedFoodItem } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to update food item');
        }
    }
    async deleteFoodItem(foodItemId) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const doc = await db.collection('food-items').doc(foodItemId).get();
            if (!doc.exists) {
                return { success: false, status: common_1.HttpStatus.NOT_FOUND, message: 'Food item not found' };
            }
            await db.collection('food-items').doc(foodItemId).delete();
            return { success: true, status: common_1.HttpStatus.OK, data: { id: foodItemId, ...doc.data() } };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to delete food item');
        }
    }
    async searchFoodsByName(name) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const snapshot = await db.collection('food-items')
                .orderBy('name')
                .startAt(name)
                .endAt(name + '\uf8ff')
                .get();
            const foodItems = [];
            snapshot.forEach(doc => {
                foodItems.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, status: common_1.HttpStatus.OK, data: foodItems };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to search food items by name');
        }
    }
    async filterFoodsByCategory(category) {
        try {
            const db = firebase_config_1.default.getFirestore();
            const snapshot = await db.collection('food-items').where('category', '==', category).get();
            const foodItems = [];
            snapshot.forEach(doc => {
                foodItems.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, status: common_1.HttpStatus.OK, data: foodItems };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException('Failed to filter food items by category');
        }
    }
};
exports.NutritionalDatabaseService = NutritionalDatabaseService;
exports.NutritionalDatabaseService = NutritionalDatabaseService = NutritionalDatabaseService_1 = __decorate([
    (0, common_1.Injectable)()
], NutritionalDatabaseService);
//# sourceMappingURL=nutritional-database.service.js.map