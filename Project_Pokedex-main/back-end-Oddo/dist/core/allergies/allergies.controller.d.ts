import { AllergiesService } from './allergies.service';
export declare class AllergiesController {
    private readonly allergiesService;
    constructor(allergiesService: AllergiesService);
    addAllergy(allergy: any, res: any): Promise<any>;
    getAllAllergies(res: any): Promise<any>;
    getAllergyById(id: string, res: any): Promise<any>;
    updateAllergy(id: string, updatedAllergy: any, res: any): Promise<any>;
    deleteAllergy(id: string, res: any): Promise<any>;
}
