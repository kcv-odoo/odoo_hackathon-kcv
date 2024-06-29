// src/allergies/allergies.service.ts
import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import fb  from '../../firebase/firebase.config'; // replace with your Firebase initialization
import { Logger } from '@nestjs/common';

@Injectable()
export class AllergiesService {
  private readonly logger = new Logger(AllergiesService.name);

  async addAllergy(allergy: any): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const result = await db.collection('allergies').add(allergy);
      return { success: true, status: HttpStatus.CREATED, data: { id: result.id, ...allergy } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to add allergy');
    }
  }

  async getAllAllergies() {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const snapshot = await db.collection('allergies').get();
      const allergies = [];
      snapshot.forEach(doc => {
        allergies.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, status: HttpStatus.OK, data: allergies };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch allergies');
    }
  }

  async getAllergyById(id: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const doc = await db.collection('allergies').doc(id).get();
      if (!doc.exists) {
        return { success: false, status: HttpStatus.NOT_FOUND, message: 'Allergy not found' };
      }
      return { success: true, status: HttpStatus.OK, data: { id: doc.id, ...doc.data() } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch allergy');
    }
  }

  async updateAllergy(id: string, updatedAllergy: any): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      await db.collection('allergies').doc(id).update(updatedAllergy);
      return { success: true, status: HttpStatus.OK, data: { id, ...updatedAllergy } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update allergy');
    }
  }

  async deleteAllergy(id: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const doc = await db.collection('allergies').doc(id).get();
      if (!doc.exists) {
        return { success: false, status: HttpStatus.NOT_FOUND, message: 'Allergy not found' };
      }
      await db.collection('allergies').doc(id).delete();
      return { success: true, status: HttpStatus.OK, data: { id, ...doc.data() } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to delete allergy');
    }
  }
}
