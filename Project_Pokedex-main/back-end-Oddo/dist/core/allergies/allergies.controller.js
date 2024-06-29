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
exports.AllergiesController = void 0;
const common_1 = require("@nestjs/common");
const allergies_service_1 = require("./allergies.service");
let AllergiesController = class AllergiesController {
    constructor(allergiesService) {
        this.allergiesService = allergiesService;
    }
    async addAllergy(allergy, res) {
        try {
            const result = await this.allergiesService.addAllergy(allergy);
            return res.status(result.status).send(result);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to add allergy');
        }
    }
    async getAllAllergies(res) {
        try {
            const allergies = await this.allergiesService.getAllAllergies();
            return res.status(allergies.status).send(allergies);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch allergies');
        }
    }
    async getAllergyById(id, res) {
        try {
            const allergy = await this.allergiesService.getAllergyById(id);
            if (!allergy.success) {
                throw new common_1.InternalServerErrorException('Allergy not found');
            }
            return res.status(allergy.status).send(allergy);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch allergy');
        }
    }
    async updateAllergy(id, updatedAllergy, res) {
        try {
            const result = await this.allergiesService.updateAllergy(id, updatedAllergy);
            return res.status(result.status).send(result);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update allergy');
        }
    }
    async deleteAllergy(id, res) {
        try {
            const result = await this.allergiesService.deleteAllergy(id);
            if (!result.success) {
                throw new common_1.InternalServerErrorException('Allergy not found');
            }
            return res.status(result.status).send(result);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete allergy');
        }
    }
};
exports.AllergiesController = AllergiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AllergiesController.prototype, "addAllergy", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AllergiesController.prototype, "getAllAllergies", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AllergiesController.prototype, "getAllergyById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AllergiesController.prototype, "updateAllergy", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AllergiesController.prototype, "deleteAllergy", null);
exports.AllergiesController = AllergiesController = __decorate([
    (0, common_1.Controller)('allergies'),
    __metadata("design:paramtypes", [allergies_service_1.AllergiesService])
], AllergiesController);
//# sourceMappingURL=allergies.controller.js.map