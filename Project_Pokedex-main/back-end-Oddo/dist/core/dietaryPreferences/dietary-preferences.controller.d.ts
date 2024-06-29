import { DietaryPreferencesService } from './dietary-preferences.service';
export declare class DietaryPreferencesController {
    private readonly dietaryPreferencesService;
    constructor(dietaryPreferencesService: DietaryPreferencesService);
    addDietaryPreference(dietaryPreference: any): Promise<any>;
    getAllDietaryPreferences(): Promise<any>;
    getDietaryPreferenceById(id: string): Promise<any>;
    updateDietaryPreference(id: string, updatedPreference: any): Promise<any>;
    deleteDietaryPreference(id: string): Promise<any>;
}
