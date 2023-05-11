import openai
import sys

openai.api_key = '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'

meal = sys.argv[1]

response = openai.Completion.create(
  engine="text-davinci-002",
  prompt=f"Provide nutritional information for a typical serving of {meal} in json format.",
  temperature=0.3,
  max_tokens=200
)

print(response.choices[0].text.strip())
