import openai
import sys
import os
import json
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv('GPT_API_KEY')

meal = sys.argv[1]
meal_size = sys.argv[2]

try:
    response = openai.Completion.create(
      engine="text-davinci-002",
      prompt=f"Provide nutritional information for a {meal_size} serving of {meal} in json format, including details for calories (kcal), total fat (g), saturated fat (g), trans fat (g), cholesterol (mg), sodium (mg), total carbohydrate (g), dietary fiber (g), sugars (g), protein (g), vitamin D (μg), calcium (mg), iron (mg), and potassium (mg).",
      temperature=0.3,
      max_tokens=300
    )

    output = json.loads(response.choices[0].text.strip())
    print(json.dumps(output))

except Exception as e:
    error_message = {"error": str(e)}
    print(json.dumps(error_message))
    
