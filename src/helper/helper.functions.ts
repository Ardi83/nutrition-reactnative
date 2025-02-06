import { CreateAIDto, NutritionAIInfo } from "../types/index.d";

export const parseAIResponse = (response: string) => {
    // Extract the JSON part from the response
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}') + 1;
    const jsonString = response.slice(jsonStart, jsonEnd);

    // Parse the JSON string into a JavaScript object
    const data = JSON.parse(jsonString);

    return data;
}

export const combineAllItems = (data: CreateAIDto): NutritionAIInfo => {
    const result: NutritionAIInfo = {
        calories: 0,
        fats: 0,
        proteins: 0,
        carbs: 0,
        fiber: 0,
        sugar: 0,
        vitaminA: 0,
        vitaminC: 0,
        vitaminD: 0,
        vitaminE: 0,
        water: 0,
    };

    for (const item of Object.values(data)) {
        for (const [key, value] of Object.entries(item)) {
            result[key as keyof NutritionAIInfo] += value;
        }
    }

    return result;
}