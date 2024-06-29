"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./core/user/user.module");
const allergies_module_1 = require("./core/allergies/allergies.module");
const dietaryPreferences_module_1 = require("./core/dietaryPreferences/dietaryPreferences.module");
const health_goals_module_1 = require("./core/health-goals/health-goals.module");
const nutritional_database_module_1 = require("./core/Nutritional/nutritional-database.module");
const diet_plan_module_1 = require("./core/best-diet-plan/diet-plan.module");
const image_upload_module_1 = require("./core/image-upload/image-upload.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, allergies_module_1.AllergiesModule, dietaryPreferences_module_1.DietaryPreferencesModule, health_goals_module_1.HealthGoalsModule, nutritional_database_module_1.NutritionalDatabaseModule, diet_plan_module_1.DietPlanModule, image_upload_module_1.ImageUploadModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map