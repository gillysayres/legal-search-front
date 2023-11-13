# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Your app runs on port 3001
EXPOSE 3001

# Define environment variable for the port (if your app uses it)
ENV PORT 3001

# Command to start the app
CMD ["npm", "start"]
