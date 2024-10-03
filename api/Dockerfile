# Dockerfile for API
FROM node:14

# Set working directory
WORKDIR /app/api

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the API files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
