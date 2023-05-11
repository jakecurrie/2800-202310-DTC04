import tensorflow_hub as hub
import numpy as np
import pandas as pd
import cv2
import sys
import json

model = hub.KerasLayer('https://tfhub.dev/google/aiy/vision/classifier/food_V1/1')
image_path = sys.argv[1]
labelmap_url = "https://www.gstatic.com/aihub/tfhub/labelmaps/aiy_food_V1_labelmap.csv"
input_shape = (224, 224)

image = cv2.imread(image_path)
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image = cv2.resize(image, dsize=input_shape, interpolation=cv2.INTER_CUBIC)
image = image / 255.0
images = np.expand_dims(image, 0)

output = model(images)
probabilities = output.numpy().squeeze()
predicted_indices = np.argsort(probabilities)[::-1][:8]

classes = list(pd.read_csv(labelmap_url)["name"])
predicted_meals = [classes[index] for index in predicted_indices]
print(json.dumps(predicted_meals))