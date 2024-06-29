import { HttpStatus } from '@nestjs/common';
export declare class NutritionalDatabaseService {
    private readonly logger;
    addFoodItem(foodItem: any): Promise<any>;
    getAllFoodItems(): Promise<{
        success: boolean;
        status: HttpStatus;
        data: any[];
    }>;
    getFoodItemById(foodItemId: string): Promise<any>;
    updateFoodItem(foodItemId: string, updatedFoodItem: any): Promise<any>;
    deleteFoodItem(foodItemId: string): Promise<any>;
    searchFoodsByName(name: string): Promise<any>;
    filterFoodsByCategory(category: string): Promise<{
        success: boolean;
        status: HttpStatus;
        data: any[];
    }>;
}
