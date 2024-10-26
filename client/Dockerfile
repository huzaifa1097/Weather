# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code
COPY . .

# Build the client application
RUN npm run build

# Serve the build with a simple server
RUN npm install -g serve

# Expose the port for the client app
EXPOSE 3000

# Start the client server
CMD ["serve", "-s", "build"]
