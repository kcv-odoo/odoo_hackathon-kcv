// src/dietary-preferences/dietary-preferences.module.ts
import { Module } from '@nestjs/common';
import { DietaryPreferencesController } from './dietary-preferences.controller';
import { DietaryPreferencesService } from './dietary-preferences.service';


@Module({
  controllers: [DietaryPreferencesController],
  providers: [DietaryPreferencesService],
})
export class DietaryPreferencesModule {}
