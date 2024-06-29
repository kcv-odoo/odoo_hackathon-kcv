import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import fb  from '../../firebase/firebase.config'; // replace with your Firebase initialization
import { Logger } from '@nestjs/common';

@Injectable()
export class NutritionalDatabaseService {
  private readonly logger = new Logger(NutritionalDatabaseService.name);

  async addFoodItem(foodItem: any): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const result = await db.collection('food-items').add(foodItem);
      return { success: true, status: HttpStatus.CREATED, data: { id: result.id, ...foodItem } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to add food item');
    }
  }

  async getAllFoodItems(){
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const snapshot = await db.collection('food-items').get();
      const foodItems = [];
      snapshot.forEach(doc => {
        foodItems.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, status: HttpStatus.OK, data: foodItems };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch food items');
    }
  }

  async getFoodItemById(foodItemId: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const doc = await db.collection('food-items').doc(foodItemId).get();
      if (!doc.exists) {
        return { success: false, status: HttpStatus.NOT_FOUND, message: 'Food item not found' };
      }
      return { success: true, status: HttpStatus.OK, data: { id: doc.id, ...doc.data() } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch food item');
    }
  }

  async updateFoodItem(foodItemId: string, updatedFoodItem: any): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      await db.collection('food-items').doc(foodItemId).update(updatedFoodItem);
      return { success: true, status: HttpStatus.OK, data: { id: foodItemId, ...updatedFoodItem } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update food item');
    }
  }

  async deleteFoodItem(foodItemId: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const doc = await db.collection('food-items').doc(foodItemId).get();
      if (!doc.exists) {
        return { success: false, status: HttpStatus.NOT_FOUND, message: 'Food item not found' };
      }
      await db.collection('food-items').doc(foodItemId).delete();
      return { success: true, status: HttpStatus.OK, data: { id: foodItemId, ...doc.data() } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to delete food item');
    }
  }

  async searchFoodsByName(name: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const snapshot = await db.collection('food-items')
        .orderBy('name')
        .startAt(name)
        .endAt(name + '\uf8ff')
        .get();
      const foodItems = [];
      snapshot.forEach(doc => {
        foodItems.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, status: HttpStatus.OK, data: foodItems };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to search food items by name');
    }
  }

  async filterFoodsByCategory(category: string) {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const snapshot = await db.collection('food-items').where('category', '==', category).get();
      const foodItems = [];
      snapshot.forEach(doc => {
        foodItems.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, status: HttpStatus.OK, data: foodItems };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to filter food items by category');
    }
  }
}
