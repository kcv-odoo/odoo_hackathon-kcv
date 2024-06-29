import { Module } from '@nestjs/common';
import { DietPlanService } from './diet-plan.service';
import { DietPlanController } from './diet-plan.controller';


@Module({
  providers: [DietPlanService],
  controllers: [DietPlanController],
})
export class DietPlanModule {}
