import { HealthGoalsService } from './health-goals.service';
export declare class HealthGoalsController {
    private readonly healthGoalsService;
    constructor(healthGoalsService: HealthGoalsService);
    addHealthGoal(goal: any, res: any): Promise<any>;
    getAllHealthGoals(res: any): Promise<any[]>;
    getHealthGoalById(id: string, res: any): Promise<any>;
    updateHealthGoal(id: string, updatedGoal: any, res: any): Promise<any>;
    deleteHealthGoal(id: string, res: any): Promise<any>;
}
