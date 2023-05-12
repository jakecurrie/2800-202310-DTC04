# Stage 1: Python environment for scripts
FROM python:3.9 AS scripts-env
WORKDIR /scripts
COPY ./scripts/requirements.txt ./
# Install numpy first
RUN pip install numpy>=1.21.2
# Then install the rest of the dependencies
RUN sed '/numpy/d' requirements.txt | pip install --no-cache-dir -r /dev/stdin
COPY ./scripts/ ./ 

# Stage 2: Node environment for server
FROM node:14
WORKDIR /app

# Prepare server
COPY package*.json ./
RUN npm install

# Copy server source code
COPY . ./

# Copy python scripts from the first stage
COPY --from=scripts-env /scripts ./scripts

# Expose port for server
EXPOSE 8080

# Start server
CMD ["node", "app.js"]



