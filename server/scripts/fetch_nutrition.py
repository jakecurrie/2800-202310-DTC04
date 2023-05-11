import openai
import sys



meal = sys.argv[1]

response = openai.Completion.create(
  engine="text-davinci-002",
  prompt=f"Provide nutritional information for a typical serving of {meal} in json format.",
  temperature=0.3,
  max_tokens=200
)

print(response.choices[0].text.strip())
