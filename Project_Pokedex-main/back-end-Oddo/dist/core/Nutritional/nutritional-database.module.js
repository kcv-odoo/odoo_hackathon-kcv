"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionalDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const nutritional_database_controller_1 = require("./nutritional-database.controller");
const nutritional_database_service_1 = require("./nutritional-database.service");
;
let NutritionalDatabaseModule = class NutritionalDatabaseModule {
};
exports.NutritionalDatabaseModule = NutritionalDatabaseModule;
exports.NutritionalDatabaseModule = NutritionalDatabaseModule = __decorate([
    (0, common_1.Module)({
        controllers: [nutritional_database_controller_1.NutritionalDatabaseController],
        providers: [nutritional_database_service_1.NutritionalDatabaseService],
    })
], NutritionalDatabaseModule);
//# sourceMappingURL=nutritional-database.module.js.map