require('dotenv').config()
const userModel = require('../../model/users');
const { Configuration, OpenAIApi } = require("openai");



const apiKey = process.env.GPT_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey
});

const openai = new OpenAIApi(configuration);

async function getCompletion(req, formData) {

  var equipmentAvailable = ""
  if (formData.equipmentAvailable == "yes") {
    equipmentAvailable  = "access to equipment"
  } else {
    equipmentAvailable  = "no access to equipment"
  }
  const prePrompt= "Respond with a RFC8259 Compliant JSON formatted response using the following article: Imagine you are a fitness guru. Someone is coming to you for a workout plan because they don't know how to make one themselves. Create a workout plan using these specifications: "
  const answerOne = `Their primary focus is ${formData.fitnessGoals}. `  
  const answerTwo= `Their experience level is ${formData.fitnessLevel}. `
  const answerThree = `They want to workout on ${formData.selectedDays}. `
  const answerFour = `They have ${equipmentAvailable}. `
  const answerFive = `The workout will be of ${formData.intensityLevel} intensity. Low means 3 exercises per day, Medium means 4 exercises per day and High means 5 exercises per day. `
  const answerSix = `The plan duration should be ${formData.planDuration} weeks. `
  const postPrompt = "only provide a RFC8259 compliant JSON response following this format without deviation\n data: {\n  duration: Number,\n  exercises: [\n    {\n      exerciseName: String,\n      sets: Number,\n      reps: Number,\n      day: String,\n      order: Number\n    }\n  ]\n}\nwhere order is the order of the exercise in the workout. Make sure the keys are surrounded by quotes because this will be parsed by JSON.parse. Do not begin your response with '()'. Do not give any exercise that do not have reps in them (eg: planks)"
  const prompt = prePrompt + answerOne + answerTwo + answerThree + answerFour + answerFive + answerSix + postPrompt;
  console.log(prompt);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2000,
    temperature: 0.5
  });
  console.log(completion.data.choices[0].text);
  return completion.data.choices[0].text;
}

async function getDietPlanCompletion(req, formData) {
  var equipmentAvailable = ""
  if (formData.equipmentAvailable == "yes") {
    equipmentAvailable  = "access to equipment"
  } else {
    equipmentAvailable  = "no access to equipment"
  }
  const prePrompt= "Respond with a RFC8259 Compliant JSON formatted response using the following article: Imagine you are a nutritionist. Create a meal plan for every day of the week tailored to these specifications "
  const mealsPerDay = `They want ${formData.mealsPerDay} meals per day. `
  const calories = `Daily calorie intake must be ${formData.calorieGoals} with room for error primary focus is . `  
  const protein = `Their protein intake must be minimum ${formData.proteinGoals} grams. `
  const fat = `Their fat intake must be maximum ${formData.fatGoals} grams. `
  const carbs = `Their carb intake must be minimum ${formData.carbGoals} grams. `

  const allergies= `They have food allergies towards ${formData.dietaryRestrictions}. `

  const answerTwo = `They want to workout on ${formData.selectedDays}. `
  const answerFour = `They have ${equipmentAvailable}. `
  const answerFive = `The workout will be of ${formData.intensityLevel} intensity. Low means 3 exercises per day, Medium means 4 exercises per day and High means 5 exercises per day. `
  const answerSix = `The plan duration should be ${formData.planDuration} weeks. `
  const postPrompt = "only provide a RFC8259 compliant JSON response following this format without deviation\n data: {\n  duration: Number,\n  meals: [\n    {\n      name: String,\n      description: String,\n      calories: Number,\n      protein: Number,\n      carbs: String,\n      fat: Number\n      day: String\n     order: Number\n    }\n  ]\n}\nwhere order is the order of the meal in the day. Absolutely make sure there are meals for every day of the week. Name is the name of the meal and description is the short recipe process. Make sure the keys are surrounded by quotes because this will be parsed by JSON.parse. Do not begin your response with '()'"
  const prompt = prePrompt + mealsPerDay + calories + protein + fat + carbs + postPrompt;
  console.log(prompt);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 3000,
    temperature: 0.5
  });
  console.log(completion.data.choices[0].text);
  return completion.data.choices[0].text;
}

async function getNutritionEstimate(mealDescription) {
  const prompt = `Provide nutritional information for a typical serving of ${mealDescription} in json format.`;
  const nutritionEstimate = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 200,
    temperature: 0.3
  });

  const nutritionText = nutritionEstimate.data.choices[0].text.trim();
  const lines = nutritionText.split("\n");

  const nutritionObject = {};

  lines.forEach((line) => {
    const [key, value] = line.split(":");
    if (key && value) {
      const nutrientKey = key.trim();
      const nutrientValue = value.trim();
      nutritionObject[nutrientKey] = nutrientValue;
    }
  });

  return nutritionObject;
}

module.exports = {
  getDietPlanCompletion,
  getCompletion,
  getNutritionEstimate
};

