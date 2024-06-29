import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { DietPlanService } from './diet-plan.service';
import { BestDietPlan } from './best-diet-plan.interface';

@Controller('best-diet-plans')
export class DietPlanController {
  constructor(private readonly dietPlanService: DietPlanService) {}

  @Post()
  async createBestDietPlan(@Res() res, @Body() bestDietPlan: BestDietPlan) {
    const result = await this.dietPlanService.createBestDietPlan(bestDietPlan);
    return res.status(result.status).send(result);
  }

  @Get()
  async getAllBestDietPlans(@Res() res) {
    const result = await this.dietPlanService.getAllBestDietPlans();
    return res.status(result.status).send(result);
  }

  @Get(':id')
  async getBestDietPlanById(@Res() res, @Param('id') id: string) {
    const result = await this.dietPlanService.getBestDietPlanById(id);
    return res.status(result.status).send(result);
  }

  @Put(':id')
  async updateBestDietPlan(@Res() res, @Param('id') id: string, @Body() bestDietPlan: BestDietPlan) {
    const result = await this.dietPlanService.updateBestDietPlan(id, bestDietPlan);
    return res.status(result.status).send(result);
  }

  @Delete(':id')
  async deleteBestDietPlan(@Res() res, @Param('id') id: string) {
    const result = await this.dietPlanService.deleteBestDietPlan(id);
    return res.status(result.status).send(result);
  }
}
