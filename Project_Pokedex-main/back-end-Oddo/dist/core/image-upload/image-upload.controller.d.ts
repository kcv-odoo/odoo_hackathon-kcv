import { ImageUploadService } from "./image-upload.service";
export declare class ImageUploadController {
    private readonly imageuploadService;
    constructor(imageuploadService: ImageUploadService);
    uploadFile(file: Express.Multer.File, res: any): Promise<any>;
}
