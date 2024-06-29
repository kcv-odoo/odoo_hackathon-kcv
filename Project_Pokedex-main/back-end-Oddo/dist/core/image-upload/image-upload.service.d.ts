export declare class ImageUploadService {
    private allowedMimeTypes;
    private isAllowedMimeType;
    private generateUniqueFileName;
    uploadFile(file: Express.Multer.File): Promise<{
        success: boolean;
        status: number;
        data?: {
            image: string;
        };
        error?: string;
    }>;
}
