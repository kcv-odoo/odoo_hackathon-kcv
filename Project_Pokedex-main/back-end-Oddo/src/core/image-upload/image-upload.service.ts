import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { extname } from 'path';
import fb from '../../firebase/firebase.config';

@Injectable()
export class ImageUploadService {

    private allowedMimeTypes = [
      'image/jpeg', 'image/png', 'image/jpg', 'application/pdf'
    ];

    private isAllowedMimeType(mimeType: string): boolean {
      return this.allowedMimeTypes.includes(mimeType);
    }

    // Method to generate a new file name
    private generateUniqueFileName(originalName: string): string {
      const fileExtension = extname(originalName);
      const timestamp = new Date().getTime();
      const fileNameWithoutExtension = originalName.split('.').slice(0, -1).join('.').replace(/\s+/g, '_');
      return `user/${fileNameWithoutExtension}_${timestamp}${fileExtension}`;
    }
    
    async uploadFile(file: Express.Multer.File): Promise<{ success: boolean; status: number; data?: { image: string }; error?: string }> {
        try {
          const bucket = fb.getStorageBucket();
          if(!file)
              throw new NotFoundException("File does not exist !!");
          if (!this.isAllowedMimeType(file.mimetype)) {
            throw new NotFoundException("Invalid file type. Only image and PDF files are allowed.");
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
                "status": HttpStatus.INTERNAL_SERVER_ERROR,
                "error": 'Something went wrong while uploading the image',
              });
            });
    
            blobStream.on('finish', async () => {
              // Make the file publicly readable
              try {
                await blob.makePublic();
              } catch (err) {
                console.error('Error making file public', err);
                reject({
                  "success": false,
                  "status": HttpStatus.INTERNAL_SERVER_ERROR,
                  "error": 'Failed to make file public',
                });
              }
    
              const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
              resolve({
                "success": true,
                "status": HttpStatus.OK,
                "data": { "image": publicUrl },
              });
            });
    
            blobStream.end(file.buffer);
          });
        } catch (error) {
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