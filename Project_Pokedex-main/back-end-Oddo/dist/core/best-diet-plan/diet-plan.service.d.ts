import { HttpStatus } from '@nestjs/common';
import { BestDietPlan } from './best-diet-plan.interface';
export declare class DietPlanService {
    private readonly logger;
    createBestDietPlan(bestDietPlan: BestDietPlan): Promise<any>;
    getAllBestDietPlans(): Promise<{
        success: boolean;
        status: HttpStatus;
        data: any[];
    }>;
    getBestDietPlanById(dietPlanId: string): Promise<any>;
    updateBestDietPlan(dietPlanId: string, bestDietPlan: any): Promise<{
        success: boolean;
        status: HttpStatus;
        data: any;
    }>;
    deleteBestDietPlan(dietPlanId: string): Promise<any>;
}
