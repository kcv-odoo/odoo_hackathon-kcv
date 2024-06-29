import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './core/user/user.module';
import { AllergiesModule } from './core/allergies/allergies.module';
import { DietaryPreferencesModule } from './core/dietaryPreferences/dietaryPreferences.module';
import { HealthGoalsModule } from './core/health-goals/health-goals.module';
import { NutritionalDatabaseModule } from './core/Nutritional/nutritional-database.module';
import { DietPlanModule } from './core/best-diet-plan/diet-plan.module';
import { ImageUploadModule } from './core/image-upload/image-upload.module';

@Module({
  imports: [UserModule , AllergiesModule , DietaryPreferencesModule , HealthGoalsModule , NutritionalDatabaseModule , DietPlanModule, ImageUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
