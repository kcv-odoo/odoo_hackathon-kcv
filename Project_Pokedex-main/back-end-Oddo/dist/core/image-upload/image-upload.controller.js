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
exports.ImageUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const image_upload_service_1 = require("./image-upload.service");
let ImageUploadController = class ImageUploadController {
    constructor(imageuploadService) {
        this.imageuploadService = imageuploadService;
    }
    async uploadFile(file, res) {
        try {
            const result = await this.imageuploadService.uploadFile(file);
            return res.status(result.status).send(result);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                console.error(error.message);
                throw new common_1.NotFoundException(error.message);
            }
            else {
                console.error(error);
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
};
exports.ImageUploadController = ImageUploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            fileSize: 2 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImageUploadController.prototype, "uploadFile", null);
exports.ImageUploadController = ImageUploadController = __decorate([
    (0, common_1.Controller)('image'),
    __metadata("design:paramtypes", [image_upload_service_1.ImageUploadService])
], ImageUploadController);
//# sourceMappingURL=image-upload.controller.js.map