// src/dietary-preferences/dietary-preferences.service.ts

import { Injectable, InternalServerErrorException, HttpStatus, Logger } from '@nestjs/common';
import  fb  from '../../firebase/firebase.config'; // replace with your Firebase initialization

@Injectable()
export class DietaryPreferencesService {
  private readonly logger = new Logger(DietaryPreferencesService.name);

  async addDietaryPreference(dietaryPreference: any): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const result = await db.collection('dietaryPreferences').add(dietaryPreference);
      return { success: true, status: HttpStatus.CREATED, data: { id: result.id, ...dietaryPreference } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to add dietary preference');
    }
  }

  async getAllDietaryPreferences(): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const snapshot = await db.collection('dietaryPreferences').get();
      const dietaryPreferences = [];
      snapshot.forEach(doc => {
        dietaryPreferences.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, status: HttpStatus.OK, data: dietaryPreferences };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch dietary preferences');
    }
  }

  async getDietaryPreferenceById(id: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const doc = await db.collection('dietaryPreferences').doc(id).get();
      if (!doc.exists) {
        return { success: false, status: HttpStatus.NOT_FOUND, message: 'Dietary preference not found' };
      }
      return { success: true, status: HttpStatus.OK, data: { id: doc.id, ...doc.data() } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch dietary preference');
    }
  }

  async updateDietaryPreference(id: string, updatedPreference: any): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      await db.collection('dietaryPreferences').doc(id).update(updatedPreference);
      return { success: true, status: HttpStatus.OK, data: { id, ...updatedPreference } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update dietary preference');
    }
  }

  async deleteDietaryPreference(id: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const doc = await db.collection('dietaryPreferences').doc(id).get();
      if (!doc.exists) {
        return { success: false, status: HttpStatus.NOT_FOUND, message: 'Dietary preference not found' };
      }
      await db.collection('dietaryPreferences').doc(id).delete();
      return { success: true, status: HttpStatus.OK, data: { id, ...doc.data() } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to delete dietary preference');
    }
  }
}
