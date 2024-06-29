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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const firebase_config_1 = __importDefault(require("../../firebase/firebase.config"));
let ImageUploadService = class ImageUploadService {
    constructor() {
        this.allowedMimeTypes = [
            'image/jpeg', 'image/png', 'image/jpg', 'application/pdf'
        ];
    }
    isAllowedMimeType(mimeType) {
        return this.allowedMimeTypes.includes(mimeType);
    }
    generateUniqueFileName(originalName) {
        const fileExtension = (0, path_1.extname)(originalName);
        const timestamp = new Date().getTime();
        const fileNameWithoutExtension = originalName.split('.').slice(0, -1).join('.').replace(/\s+/g, '_');
        return `user/${fileNameWithoutExtension}_${timestamp}${fileExtension}`;
    }
    async uploadFile(file) {
        try {
            const bucket = firebase_config_1.default.getStorageBucket();
            if (!file)
                throw new common_1.NotFoundException("File does not exist !!");
            if (!this.isAllowedMimeType(file.mimetype)) {
                throw new common_1.NotFoundException("Invalid file type. Only image and PDF files are allowed.");
            }
            const uniqueFileName = this.generateUniqueFileName(file.originalname);
            const blob = bucket.file(uniqueFileName);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
                resumable: false,
            });
            return new Promise((resolve, reject) => {
                blobStream.on('error', (err) => {
                    console.error(err);
                    reject({
                        "success": false,
                        "status": common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        "error": 'Something went wrong while uploading the image',
                    });
                });
                blobStream.on('finish', async () => {
                    try {
                        await blob.makePublic();
                    }
                    catch (err) {
                        console.error('Error making file public', err);
                        reject({
                            "success": false,
                            "status": common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                            "error": 'Failed to make file public',
                        });
                    }
                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                    resolve({
                        "success": true,
                        "status": common_1.HttpStatus.OK,
                        "data": { "image": publicUrl },
                    });
                });
                blobStream.end(file.buffer);
            });
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
exports.ImageUploadService = ImageUploadService;
exports.ImageUploadService = ImageUploadService = __decorate([
    (0, common_1.Injectable)()
], ImageUploadService);
//# sourceMappingURL=image-upload.service.js.map