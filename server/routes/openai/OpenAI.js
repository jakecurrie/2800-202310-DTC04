require('dotenv').config()
const userModel = require('../../model/users');



var equipmentAvailable = ""
const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.GPT_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey
});


const openai = new OpenAIApi(configuration);
  async function getCompletion(req, formData) {

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
  const postPrompt = "only provide a RFC8259 compliant JSON response following this format without deviation {data: {exerciseName: String, sets: Number, reps: Number, day: String, order: Number,}} where order is the order of the exercise in the workout. Make sure the keys are surrounded by quotes because this will be parsed by JSON.parse. Do not begin your response with '()'"
  const prompt = prePrompt + answerOne + answerTwo + answerThree + answerFour + postPrompt;
  console.log(prompt);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2000,
    temperature: 0.5
  });
  console.log(completion.data.choices[0].text);
  console.log(userModel.find({_id: req.session.USER_ID}).then((res) => console.log(res)).catch((err) => console.log(err)))
  return completion.data.choices[0].text;
}


module.exports = getCompletion;
