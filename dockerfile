# Stage 1: Python environment for scripts
FROM python:3.9 AS scripts-env
WORKDIR /scripts
COPY server/scripts/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY server/scripts/ ./ 

# Stage 2: Node environment for server and client
FROM node:14
WORKDIR /2800-202310-DTC04

# Prepare server
COPY server/package*.json ./server/
RUN cd server && npm install

# Prepare client
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy server and client source code
COPY server/ ./server/
COPY client/ ./client/

# Copy python scripts from the first stage
COPY --from=scripts-env /scripts ./server/scripts

# Build client
RUN cd client && npm run build

# Expose port for server
EXPOSE 3001

# Start server
CMD ["node", "server/server.js"]
