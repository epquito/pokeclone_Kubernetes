# syntax=docker/dockerfile:1

# Step 1: Build the React application
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the application using NGINX
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Build and push Docker image:
# docker build -t slamoureux/pokeclone-front-end:eks .
# docker push slamoureux/pokeclone-front-end:eks

# Run the frontend container:
# docker run -itd -p 8080:80 --rm --name pokeclone-fe slamoureux/pokeclone-front-end:eks
