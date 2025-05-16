export enum Sex {
  Male = "m",
  Female = "f",
}

type FoodItem = {
  name: string;
  calories: number;
  servings: number;
};

const dietPlan: FoodItem[] = [
  { name: "Kellogg's Tresor", calories: 137, servings: 4 },
  { name: "Weihenstephan Haltbare Milch", calories: 64, servings: 8 },
  { name: "Mühle Frikadellen", calories: 271, servings: 4 },
  { name: "Volvic Tee", calories: 40, servings: 12 },
  { name: "Neuburger lockerer Sahnepudding", calories: 297, servings: 1 },
  { name: "Lagnese Viennetta", calories: 125, servings: 6 },
  { name: "Schöller 10ForTwo", calories: 482, servings: 2 },
  { name: "Ristorante Pizza Salame", calories: 835, servings: 2 },
  { name: "Schweppes Ginger Ale", calories: 37, servings: 25 },
  { name: "Mini Babybel", calories: 59, servings: 20 },
]

function calculateTotalCalories(plan: FoodItem[]):number {
  return plan.reduce((total, item) => total + item.calories * item.servings, 0)
}

function calculateBMR(weightKg: number, heightM: number, ageY: number, sex: Sex): number {
  const heightCm = heightM * 100;
  if (sex === Sex.Male) {
    return Math.ceil(66.47 + 13.7 * weightKg + 5.003 * heightCm - 6.75 * ageY);
  } else {
    return Math.ceil(655.1 + 9.563 * weightKg + 1.85 * heightCm - 4.676 * ageY);
  }
}

export function calcDateOnDiet(
  currentWeightKg: number,
  targetWeightKg: number,
  heightM: number,
  ageY: number,
  sex: Sex
): number {
  const targetGainKg = targetWeightKg - currentWeightKg;

  if (targetGainKg <= 0) {
    throw new Error("This diet is for gaining weight, not losing it!");
  }
  if (ageY < 16 || heightM < 1.5) {
    throw new Error("You do not qualify for this kind of diet.");
  }

  const dailyCaloriesOnDiet = calculateTotalCalories(dietPlan);
  const bmr = calculateBMR(currentWeightKg, heightM, ageY, sex);
  const dailySurplus = dailyCaloriesOnDiet - bmr;

  if (dailySurplus <= 0) {
    throw new Error("This diet is not sufficient for you to gain weight.");
  }

  const caloriesPerKg = 9000;
  return Math.ceil((caloriesPerKg * targetGainKg) / dailySurplus);
}