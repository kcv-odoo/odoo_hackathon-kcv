// src/allergies/allergies.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Res, HttpStatus, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { AllergiesService } from './allergies.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('allergies')
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Post()
  async addAllergy(@Body() allergy: any, @Res() res): Promise<any> {
    try {
      const result = await this.allergiesService.addAllergy(allergy);
      return res.status(result.status).send(result);
    } catch (error) {
      throw new InternalServerErrorException('Failed to add allergy');
    }
  }

  @Get()
  async getAllAllergies(@Res() res): Promise<any> {
    try {
      const allergies = await this.allergiesService.getAllAllergies();
      return res.status(allergies.status).send(allergies);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch allergies');
    }
  }

  @Get(':id')
  async getAllergyById(@Param('id') id: string, @Res() res): Promise<any> {
    try {
      const allergy = await this.allergiesService.getAllergyById(id);
      if (!allergy.success) {
        throw new InternalServerErrorException('Allergy not found');
      }
      return res.status(allergy.status).send(allergy);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch allergy');
    }
  }

  @Put(':id')
  async updateAllergy(@Param('id') id: string, @Body() updatedAllergy: any, @Res() res): Promise<any> {
    try {
      const result = await this.allergiesService.updateAllergy(id, updatedAllergy);
      return res.status(result.status).send(result);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update allergy');
    }
  }

  @Delete(':id')
  async deleteAllergy(@Param('id') id: string, @Res() res): Promise<any> {
    try {
      const result = await this.allergiesService.deleteAllergy(id);
      if (!result.success) {
        throw new InternalServerErrorException('Allergy not found');
      }
      return res.status(result.status).send(result);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete allergy');
    }
  }
}
