// src/health-goals/health-goals.service.ts
import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import  fb  from '../../firebase/firebase.config'; // replace with your Firebase initialization
import { Logger } from '@nestjs/common';

@Injectable()
export class HealthGoalsService {
  private readonly logger = new Logger(HealthGoalsService.name);

  async addHealthGoal(goal: any): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const result = await db.collection('health-goals').add(goal);
      return { success: true, status: HttpStatus.CREATED, data: { id: result.id, ...goal } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to add health goal');
    }
  }

  async getAllHealthGoals() {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const snapshot = await db.collection('health-goals').get();
      const goals = [];
      snapshot.forEach(doc => {
        goals.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, status: HttpStatus.OK, data: goals };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch health goals');
    }
  }

  async getHealthGoalById(id: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const doc = await db.collection('health-goals').doc(id).get();
      if (!doc.exists) {
        return { success: false, status: HttpStatus.NOT_FOUND, message: 'Health goal not found' };
      }
      return { success: true, status: HttpStatus.OK, data: { id: doc.id, ...doc.data() } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch health goal');
    }
  }

  async updateHealthGoal(id: string, updatedGoal: any): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      await db.collection('health-goals').doc(id).update(updatedGoal);
      return { success: true, status: HttpStatus.OK, data: { id, ...updatedGoal } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update health goal');
    }
  }

  async deleteHealthGoal(id: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const doc = await db.collection('health-goals').doc(id).get();
      if (!doc.exists) {
        return { success: false, status: HttpStatus.NOT_FOUND, message: 'Health goal not found' };
      }
      await db.collection('health-goals').doc(id).delete();
      return { success: true, status: HttpStatus.OK, data: { id, ...doc.data() } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to delete health goal');
    }
  }
}
