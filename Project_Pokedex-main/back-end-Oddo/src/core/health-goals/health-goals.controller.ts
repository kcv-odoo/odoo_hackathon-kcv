// src/health-goals/health-goals.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Res, HttpStatus, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { HealthGoalsService } from './health-goals.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('health-goals')
export class HealthGoalsController {
  constructor(private readonly healthGoalsService: HealthGoalsService) {}

  
  @Post()
  async addHealthGoal(@Body() goal: any, @Res() res): Promise<any> {
    try {
      const result = await this.healthGoalsService.addHealthGoal(goal);
      return res.status(result.status).send(result);
    } catch (error) {
      throw new InternalServerErrorException('Failed to add health goal');
    }
  }

  @Get()
  async getAllHealthGoals(@Res() res): Promise<any[]> {
    try {
      const goals = await this.healthGoalsService.getAllHealthGoals();
      return res.status(goals.status).send(goals);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch health goals');
    }
  }

  @Get(':id')
  async getHealthGoalById(@Param('id') id: string, @Res() res): Promise<any> {
    try {
      const goal = await this.healthGoalsService.getHealthGoalById(id);
      if (!goal.success) {
        throw new InternalServerErrorException('Health goal not found');
      }
      return res.status(goal.status).send(goal);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch health goal');
    }
  }

  @Put(':id')
  async updateHealthGoal(@Param('id') id: string, @Body() updatedGoal: any, @Res() res): Promise<any> {
    try {
      const result = await this.healthGoalsService.updateHealthGoal(id, updatedGoal);
      return res.status(result.status).send(result);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update health goal');
    }
  }

  @Delete(':id')
  async deleteHealthGoal(@Param('id') id: string, @Res() res): Promise<any> {
    try {
      const result = await this.healthGoalsService.deleteHealthGoal(id);
      if (!result.success) {
        throw new InternalServerErrorException('Health goal not found');
      }
      return res.status(result.status).send(result);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete health goal');
    }
  }
}
