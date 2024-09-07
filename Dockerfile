# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install netcat for the `nc` command
RUN apt-get update && apt-get install -y netcat

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install nodemon globally for development
RUN npm install -g nodemon

# Expose the port the app runs on
EXPOSE 3002

# Run the app
CMD [ "npm", "start" ]
