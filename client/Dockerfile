
# STAGE 1: Build the React App
FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend code and build the production app
COPY . .
RUN npm run build

# STAGE 2: Serve with Nginx (Production)

FROM nginx:alpine

# Copy the built files from Stage 1 into Nginx
# NOTE: If your app uses create-react-app, change '/app/dist' to '/app/build'
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx routing configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default for web traffic)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]