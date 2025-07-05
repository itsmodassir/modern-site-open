FROM node:lts AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the Vite app (output goes to /dist)
RUN npm run build


# -------- Stage 2: Serve with Nginx --------
FROM nginx:alpine

# Remove default nginx html files
RUN rm -rf /usr/share/nginx/html/*

# Copy the Vite build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Custom nginx config for SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
