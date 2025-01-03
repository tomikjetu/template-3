# Use an official Node.js runtime as a base image
FROM node:20.18.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 4173

# Define the command to run the app
CMD ["npm", "run", "preview"]
