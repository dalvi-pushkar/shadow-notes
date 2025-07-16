# Step 1: Build React App
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# No need for build-arg or REACT_APP_API_URL now
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine

# Replace default nginx config if needed (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Clean old content
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/build /usr/share/nginx/html

# Copy default env.js to be overridden by Helm later
COPY public/env.js /usr/share/nginx/html/env.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
