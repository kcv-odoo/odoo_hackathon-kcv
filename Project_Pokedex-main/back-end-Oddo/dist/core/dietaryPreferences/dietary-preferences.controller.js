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
exports.DietaryPreferencesController = void 0;
const common_1 = require("@nestjs/common");
const dietary_preferences_service_1 = require("./dietary-preferences.service");
let DietaryPreferencesController = class DietaryPreferencesController {
    constructor(dietaryPreferencesService) {
        this.dietaryPreferencesService = dietaryPreferencesService;
    }
    async addDietaryPreference(dietaryPreference) {
        try {
            const result = await this.dietaryPreferencesService.addDietaryPreference(dietaryPreference);
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to add dietary preference');
        }
    }
    async getAllDietaryPreferences() {
        try {
            const dietaryPreferences = await this.dietaryPreferencesService.getAllDietaryPreferences();
            return dietaryPreferences;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch dietary preferences');
        }
    }
    async getDietaryPreferenceById(id) {
        try {
            const dietaryPreference = await this.dietaryPreferencesService.getDietaryPreferenceById(id);
            if (!dietaryPreference) {
                throw new common_1.InternalServerErrorException('Dietary preference not found');
            }
            return dietaryPreference;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch dietary preference');
        }
    }
    async updateDietaryPreference(id, updatedPreference) {
        try {
            const result = await this.dietaryPreferencesService.updateDietaryPreference(id, updatedPreference);
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update dietary preference');
        }
    }
    async deleteDietaryPreference(id) {
        try {
            const result = await this.dietaryPreferencesService.deleteDietaryPreference(id);
            if (!result) {
                throw new common_1.InternalServerErrorException('Dietary preference not found');
            }
            return result;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete dietary preference');
        }
    }
};
exports.DietaryPreferencesController = DietaryPreferencesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DietaryPreferencesController.prototype, "addDietaryPreference", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DietaryPreferencesController.prototype, "getAllDietaryPreferences", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DietaryPreferencesController.prototype, "getDietaryPreferenceById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DietaryPreferencesController.prototype, "updateDietaryPreference", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DietaryPreferencesController.prototype, "deleteDietaryPreference", null);
exports.DietaryPreferencesController = DietaryPreferencesController = __decorate([
    (0, common_1.Controller)('dietary-preferences'),
    __metadata("design:paramtypes", [dietary_preferences_service_1.DietaryPreferencesService])
], DietaryPreferencesController);
//# sourceMappingURL=dietary-preferences.controller.js.map