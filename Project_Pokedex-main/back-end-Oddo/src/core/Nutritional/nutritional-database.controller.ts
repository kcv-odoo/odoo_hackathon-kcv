import { Controller, Post, Get, Put, Delete, Body, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { NutritionalDatabaseService } from './nutritional-database.service';
import { Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('nutritional-database')
export class NutritionalDatabaseController {
  private readonly logger = new Logger(NutritionalDatabaseController.name);

  constructor(private readonly nutritionalDatabaseService: NutritionalDatabaseService) {}

  @Post('add')
  async addFoodItem(@Res() res, @Body() foodItem: any) {
    this.logger.log('Received request to add a new food item');
    const result = await this.nutritionalDatabaseService.addFoodItem(foodItem);
    return res.status(result.status).send(result);
  }

  @Get('all')
  async getAllFoodItems(@Res() res) {
    this.logger.log('Received request to get all food items');
    const result = await this.nutritionalDatabaseService.getAllFoodItems();
    return res.status(result.status).send(result);
  }

  @Get(':id')
  async getFoodItemById(@Res() res, @Param('id') foodItemId: string) {
    this.logger.log(`Received request to get food item with ID ${foodItemId}`);
    const result = await this.nutritionalDatabaseService.getFoodItemById(foodItemId);
    return res.status(result.status).send(result);
  }

  @Put(':id')
  async updateFoodItem(@Res() res, @Param('id') foodItemId: string, @Body() updatedFoodItem: any) {
    this.logger.log(`Received request to update food item with ID ${foodItemId}`);
    const result = await this.nutritionalDatabaseService.updateFoodItem(foodItemId, updatedFoodItem);
    return res.status(result.status).send(result);
  }

  @Delete(':id')
  async deleteFoodItem(@Res() res, @Param('id') foodItemId: string) {
    this.logger.log(`Received request to delete food item with ID ${foodItemId}`);
    const result = await this.nutritionalDatabaseService.deleteFoodItem(foodItemId);
    return res.status(result.status).send(result);
  }

  @Get('search/:name')
  async searchFoodsByName(@Res() res, @Param('name') name: string) {
    this.logger.log(`Received request to search food items by name ${name}`);
    const result = await this.nutritionalDatabaseService.searchFoodsByName(name);
    return res.status(result.status).send(result);
  }

  @Get('filter/:category')
  async filterFoodsByCategory(@Res() res, @Param('category') category: string) {
    this.logger.log(`Received request to filter food items by category ${category}`);
    const result = await this.nutritionalDatabaseService.filterFoodsByCategory(category);
    return res.status(result.status).send(result);
  }
}
