import { NutritionalDatabaseService } from './nutritional-database.service';
export declare class NutritionalDatabaseController {
    private readonly nutritionalDatabaseService;
    private readonly logger;
    constructor(nutritionalDatabaseService: NutritionalDatabaseService);
    addFoodItem(res: any, foodItem: any): Promise<any>;
    getAllFoodItems(res: any): Promise<any>;
    getFoodItemById(res: any, foodItemId: string): Promise<any>;
    updateFoodItem(res: any, foodItemId: string, updatedFoodItem: any): Promise<any>;
    deleteFoodItem(res: any, foodItemId: string): Promise<any>;
    searchFoodsByName(res: any, name: string): Promise<any>;
    filterFoodsByCategory(res: any, category: string): Promise<any>;
}
