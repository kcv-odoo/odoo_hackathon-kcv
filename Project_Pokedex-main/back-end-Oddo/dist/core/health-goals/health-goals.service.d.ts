import { HttpStatus } from '@nestjs/common';
export declare class HealthGoalsService {
    private readonly logger;
    addHealthGoal(goal: any): Promise<any>;
    getAllHealthGoals(): Promise<{
        success: boolean;
        status: HttpStatus;
        data: any[];
    }>;
    getHealthGoalById(id: string): Promise<any>;
    updateHealthGoal(id: string, updatedGoal: any): Promise<any>;
    deleteHealthGoal(id: string): Promise<any>;
}
