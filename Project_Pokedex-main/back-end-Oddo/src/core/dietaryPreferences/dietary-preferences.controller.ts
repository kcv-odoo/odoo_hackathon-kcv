
import { Controller, Get, Post, Body, Param, Put, Delete, InternalServerErrorException, HttpStatus, UseGuards } from '@nestjs/common';
import { DietaryPreferencesService } from './dietary-preferences.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('dietary-preferences')
export class DietaryPreferencesController {
  constructor(private readonly dietaryPreferencesService: DietaryPreferencesService) {}

  
  @Post()
  async addDietaryPreference(@Body() dietaryPreference: any): Promise<any> {
    try {
      const result = await this.dietaryPreferencesService.addDietaryPreference(dietaryPreference);
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Failed to add dietary preference');
    }
  }

  @Get()
  async getAllDietaryPreferences(): Promise<any> {
    try {
      const dietaryPreferences = await this.dietaryPreferencesService.getAllDietaryPreferences();
      return dietaryPreferences;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch dietary preferences');
    }
  }

  @Get(':id')
  async getDietaryPreferenceById(@Param('id') id: string): Promise<any> {
    try {
      const dietaryPreference = await this.dietaryPreferencesService.getDietaryPreferenceById(id);
      if (!dietaryPreference) {
        throw new InternalServerErrorException('Dietary preference not found');
      }
      return dietaryPreference;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch dietary preference');
    }
  }

  @Put(':id')
  async updateDietaryPreference(@Param('id') id: string, @Body() updatedPreference: any): Promise<any> {
    try {
      const result = await this.dietaryPreferencesService.updateDietaryPreference(id, updatedPreference);
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update dietary preference');
    }
  }

  @Delete(':id')
  async deleteDietaryPreference(@Param('id') id: string): Promise<any> {
    try {
      const result = await this.dietaryPreferencesService.deleteDietaryPreference(id);
      if (!result) {
        throw new InternalServerErrorException('Dietary preference not found');
      }
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete dietary preference');
    }
  }
}
