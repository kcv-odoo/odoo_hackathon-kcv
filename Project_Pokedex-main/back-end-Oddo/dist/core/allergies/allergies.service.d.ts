import { HttpStatus } from '@nestjs/common';
export declare class AllergiesService {
    private readonly logger;
    addAllergy(allergy: any): Promise<any>;
    getAllAllergies(): Promise<{
        success: boolean;
        status: HttpStatus;
        data: any[];
    }>;
    getAllergyById(id: string): Promise<any>;
    updateAllergy(id: string, updatedAllergy: any): Promise<any>;
    deleteAllergy(id: string): Promise<any>;
}
