# Using image with both Python and Node.js
FROM nikolaik/python-nodejs:latest

# Set work directory for server
WORKDIR /app

# Install necessary system dependencies
RUN apt-get update && apt-get install -y libgl1-mesa-glx

# Install Python dependencies
COPY ./scripts/requirements.txt ./scripts/
RUN pip install --no-cache-dir -r ./scripts/requirements.txt

# Install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy server source code
COPY . ./

# Expose port for server
EXPOSE 3001

# Start server
CMD ["node", "app.js"]

