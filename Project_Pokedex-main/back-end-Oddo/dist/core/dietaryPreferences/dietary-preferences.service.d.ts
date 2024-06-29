export declare class DietaryPreferencesService {
    private readonly logger;
    addDietaryPreference(dietaryPreference: any): Promise<any>;
    getAllDietaryPreferences(): Promise<any>;
    getDietaryPreferenceById(id: string): Promise<any>;
    updateDietaryPreference(id: string, updatedPreference: any): Promise<any>;
    deleteDietaryPreference(id: string): Promise<any>;
}
