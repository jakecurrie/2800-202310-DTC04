import openai
import sys
import dotenv
import os
import json

dotenv.load_dotenv('../../.env')
openai.api_key = os.getenv('GPT_API_KEY')
meal = sys.argv[1]

try:
    response = openai.Completion.create(
      engine="text-davinci-002",
      prompt=f"Provide nutritional information for a typical serving of {meal} in json format.",
      temperature=0.3,
      max_tokens=200
    )

    output = json.loads(response.choices[0].text.strip())
    print(json.dumps(output))

except Exception as e:
    error_message = {"error": str(e)}
    print(json.dumps(error_message))

