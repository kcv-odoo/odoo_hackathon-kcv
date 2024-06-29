import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import fb from '../../firebase/firebase.config'; // adjust with your Firebase setup
import { Logger } from '@nestjs/common';
import { BestDietPlan } from './best-diet-plan.interface';

@Injectable()
export class DietPlanService {
  private readonly logger = new Logger(DietPlanService.name);

  async createBestDietPlan(bestDietPlan: BestDietPlan): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const result = await db.collection('best-diet-plans').add(bestDietPlan);
      return { success: true, status: HttpStatus.CREATED, data: { id: result.id, ...bestDietPlan } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to create best diet plan');
    }
  }

  async getAllBestDietPlans() {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const snapshot = await db.collection('best-diet-plans').get();
      const dietPlans = [];
      snapshot.forEach(doc => {
        dietPlans.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, status: HttpStatus.OK, data: dietPlans };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch best diet plans');
    }
  }

  async getBestDietPlanById(dietPlanId: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const doc = await db.collection('best-diet-plans').doc(dietPlanId).get();
      if (!doc.exists) {
        return { success: false, status: HttpStatus.NOT_FOUND, message: 'Best diet plan not found' };
      }
      return { success: true, status: HttpStatus.OK, data: { id: doc.id, ...doc.data() } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to fetch best diet plan');
    }
  }

  async updateBestDietPlan(dietPlanId: string, bestDietPlan) {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      await db.collection('best-diet-plans').doc(dietPlanId).update(bestDietPlan);
      return { success: true, status: HttpStatus.OK, data: { id: dietPlanId, ...bestDietPlan } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to update best diet plan');
    }
  }

  async deleteBestDietPlan(dietPlanId: string): Promise<any> {
    try {
      const db = fb.getFirestore(); // adjust as per your Firebase setup
      const doc = await db.collection('best-diet-plans').doc(dietPlanId).get();
      if (!doc.exists) {
        return { success: false, status: HttpStatus.NOT_FOUND, message: 'Best diet plan not found' };
      }
      await db.collection('best-diet-plans').doc(dietPlanId).delete();
      return { success: true, status: HttpStatus.OK, data: { id: dietPlanId, ...doc.data() } };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Failed to delete best diet plan');
    }
  }
}
