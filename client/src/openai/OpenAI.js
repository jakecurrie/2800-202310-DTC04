require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const prompt = "Imagine you are a fitness guru. Someone is coming to you for a workout plan because they don't know how to make one themselves. Create a workout plan based on these specifications: Sunday, Tuesday and Wednesday are their only days available. They want to train their entire body and to split their training into 3 days."
async function getCompletion() {
  console.log("getting completion");
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 500,
    temperature: 1
  });
  console.log(completion.data.choices[0].text);
}
