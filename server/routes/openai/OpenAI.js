require("dotenv").config();

async function accessSecretVersion(secretName) {
  const name = projects/artificialgains/secrets/${secretName}/versions/latest;
  const client = new SecretManagerServiceClient();
  const [version] = await client.accessSecretVersion({
    name,
  });
  const secret = version.payload.data.toString();
  return secret;
}
const openai = new OpenAIApi(configuration);
  async function getCompletion(formData) {
    var equipmentAvailable = ""
    const { Configuration, OpenAIApi } = require("openai");
    const apiKey = await accessSecretVersion('OPENAI_API_KEY');  
    const configuration = new Configuration({
      apiKey: apiKey
    });
    if (formData.equipmentAvailable == "yes") {
      equipmentAvailable  = "access to equipment"
    } else {
      equipmentAvailable  = "no access to equipment"
    }
    const prePrompt= "Imagine you are a fitness guru. Someone is coming to you for a workout plan because they don't know how to make one themselves. Create a workout plan using these specifications: "
    const answerOne = `Their primary focus is ${formData.fitnessGoals}.`  
    const answerTwo= `They are ${formData.fitnessLevel}.`
    const answerThree = `They want to workout on ${formData.selectedDays}.`
    const answerFour = `They have ${equipmentAvailable}.`
    const prompt = prePrompt + answerOne + answerTwo + answerThree + answerFour;
    console.log(prompt);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 1
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
}


module.exports = getCompletion;
