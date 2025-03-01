FROM node:23.9-bullseye-slim AS base
WORKDIR /app

# Development
FROM base AS development
COPY package.json package-lock.json ./
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Production
FROM base AS build
COPY . .
RUN npm install
RUN npm run build

# (Using Nginx)
FROM nginx:1.27.4 AS production 
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]