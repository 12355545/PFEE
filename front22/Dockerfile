# Stage 1: Build the Angular application
FROM node:alpine3.18 AS build
# Set working directory
WORKDIR /usr/local/app
# Copy package.json and package-lock.json for npm install
COPY package.json package-lock.json /usr/local/app/
COPY . /usr/local/app/
# Install dependencies
RUN npm install
# Build the application
RUN npm run build
# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine
# Remove the existing default.conf
RUN rm /etc/nginx/conf.d/default.conf
# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/
# Copy the build output from Stage 1 to Nginx's serve folder
COPY --from=build /usr/local/app/dist/front /usr/share/nginx/html
# Expose port 80 for external access
EXPOSE 80
# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
