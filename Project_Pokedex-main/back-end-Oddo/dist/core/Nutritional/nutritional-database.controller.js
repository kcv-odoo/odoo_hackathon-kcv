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
var NutritionalDatabaseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionalDatabaseController = void 0;
const common_1 = require("@nestjs/common");
const nutritional_database_service_1 = require("./nutritional-database.service");
const common_2 = require("@nestjs/common");
let NutritionalDatabaseController = NutritionalDatabaseController_1 = class NutritionalDatabaseController {
    constructor(nutritionalDatabaseService) {
        this.nutritionalDatabaseService = nutritionalDatabaseService;
        this.logger = new common_2.Logger(NutritionalDatabaseController_1.name);
    }
    async addFoodItem(res, foodItem) {
        this.logger.log('Received request to add a new food item');
        const result = await this.nutritionalDatabaseService.addFoodItem(foodItem);
        return res.status(result.status).send(result);
    }
    async getAllFoodItems(res) {
        this.logger.log('Received request to get all food items');
        const result = await this.nutritionalDatabaseService.getAllFoodItems();
        return res.status(result.status).send(result);
    }
    async getFoodItemById(res, foodItemId) {
        this.logger.log(`Received request to get food item with ID ${foodItemId}`);
        const result = await this.nutritionalDatabaseService.getFoodItemById(foodItemId);
        return res.status(result.status).send(result);
    }
    async updateFoodItem(res, foodItemId, updatedFoodItem) {
        this.logger.log(`Received request to update food item with ID ${foodItemId}`);
        const result = await this.nutritionalDatabaseService.updateFoodItem(foodItemId, updatedFoodItem);
        return res.status(result.status).send(result);
    }
    async deleteFoodItem(res, foodItemId) {
        this.logger.log(`Received request to delete food item with ID ${foodItemId}`);
        const result = await this.nutritionalDatabaseService.deleteFoodItem(foodItemId);
        return res.status(result.status).send(result);
    }
    async searchFoodsByName(res, name) {
        this.logger.log(`Received request to search food items by name ${name}`);
        const result = await this.nutritionalDatabaseService.searchFoodsByName(name);
        return res.status(result.status).send(result);
    }
    async filterFoodsByCategory(res, category) {
        this.logger.log(`Received request to filter food items by category ${category}`);
        const result = await this.nutritionalDatabaseService.filterFoodsByCategory(category);
        return res.status(result.status).send(result);
    }
};
exports.NutritionalDatabaseController = NutritionalDatabaseController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NutritionalDatabaseController.prototype, "addFoodItem", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NutritionalDatabaseController.prototype, "getAllFoodItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NutritionalDatabaseController.prototype, "getFoodItemById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], NutritionalDatabaseController.prototype, "updateFoodItem", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NutritionalDatabaseController.prototype, "deleteFoodItem", null);
__decorate([
    (0, common_1.Get)('search/:name'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NutritionalDatabaseController.prototype, "searchFoodsByName", null);
__decorate([
    (0, common_1.Get)('filter/:category'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NutritionalDatabaseController.prototype, "filterFoodsByCategory", null);
exports.NutritionalDatabaseController = NutritionalDatabaseController = NutritionalDatabaseController_1 = __decorate([
    (0, common_1.Controller)('nutritional-database'),
    __metadata("design:paramtypes", [nutritional_database_service_1.NutritionalDatabaseService])
], NutritionalDatabaseController);
//# sourceMappingURL=nutritional-database.controller.js.map