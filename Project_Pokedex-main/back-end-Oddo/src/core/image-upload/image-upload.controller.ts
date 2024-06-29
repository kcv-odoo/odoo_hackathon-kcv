import { Controller, InternalServerErrorException, NotFoundException, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageUploadService } from "./image-upload.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('image')
export class ImageUploadController{
    constructor(private readonly imageuploadService: ImageUploadService) {}
    
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        limits : {
            fileSize: 2 * 1024 * 1024, // 2 MB
        },
        
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File , @Res() res) {
        try{
            const result = await this.imageuploadService.uploadFile(file);
            return res.status(result.status).send(result);
        }catch(error){
            if(error instanceof NotFoundException){
                console.error(error.message);
                throw new NotFoundException(error.message);
              }else{
                console.error(error);
                throw new InternalServerErrorException(error.message);
              }
        }   
    }
}