# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the API code
COPY . .

# Expose the port that the API will run on
EXPOSE 5000

# Start the API server
CMD ["npm", "start"]
