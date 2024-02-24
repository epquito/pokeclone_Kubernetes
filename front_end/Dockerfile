# syntax=docker/dockerfile:1

# Stage 1: Build the React application
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using Vite's development server
FROM node:alpine as production-stage
WORKDIR /app

# Copying package.json and vite configuration files
COPY package*.json ./
COPY vite.config.js ./
COPY --from=build-stage /app/node_modules /app/node_modules
COPY --from=build-stage /app /app

# Environment variables (for documentation, set actual values at runtime)
ENV API_BASE_URL=http://192.168.49.2:30077

# Expose the port used by Vite
EXPOSE 5173

# Command to run the Vite development server
CMD ["npm", "run", "dev"]


# Build and push Docker image:
# docker build -t slamoureux/pokeclone-front-end:minikube .
# docker push slamoureux/pokeclone-front-end:minikube

# Run the frontend container:
# docker run -itd -p 8080:80 --rm --name pokeclone-fe slamoureux/pokeclone-front-end:minikube