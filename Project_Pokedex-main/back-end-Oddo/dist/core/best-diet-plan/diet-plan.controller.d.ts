import { DietPlanService } from './diet-plan.service';
import { BestDietPlan } from './best-diet-plan.interface';
export declare class DietPlanController {
    private readonly dietPlanService;
    constructor(dietPlanService: DietPlanService);
    createBestDietPlan(res: any, bestDietPlan: BestDietPlan): Promise<any>;
    getAllBestDietPlans(res: any): Promise<any>;
    getBestDietPlanById(res: any, id: string): Promise<any>;
    updateBestDietPlan(res: any, id: string, bestDietPlan: BestDietPlan): Promise<any>;
    deleteBestDietPlan(res: any, id: string): Promise<any>;
}
