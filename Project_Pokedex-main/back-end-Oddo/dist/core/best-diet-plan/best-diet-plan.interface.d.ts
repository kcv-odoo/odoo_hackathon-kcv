export interface Meal {
    name: string;
    time: string;
    items: string[];
}
export interface BestDietPlan {
    description: string;
    dietName: string;
    date: string;
    meals: Meal[];
    calories: number;
    macronutrients: {
        protein: number;
        fat: number;
        carbs: number;
    };
    micronutrients: {
        vitamins: string[];
        minerals: string[];
    };
}
