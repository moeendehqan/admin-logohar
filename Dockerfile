# Use the official Node.js image as the base image
FROM node:latest as build-stage

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the local project files to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a smaller image for production
FROM nginx:alpine

# Copy the build output from the previous stage to the NGINX web server directory
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# Expose the desired port (replace 2102 with your desired port)
EXPOSE 2102

# Command to run the NGINX web server
CMD ["nginx", "-g", "daemon off;"]
