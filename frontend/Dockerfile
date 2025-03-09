FROM node:23.9-bullseye-slim AS base
WORKDIR /app
# Accept build arguments
ARG GRAPHQL_ENDPOINT
ARG GRAPHQL_API_TOKEN
# Set them as environment variables
ENV GRAPHQL_ENDPOINT=$GRAPHQL_ENDPOINT
ENV GRAPHQL_API_TOKEN=$GRAPHQL_API_TOKEN

# Development
FROM base AS development
COPY package.json package-lock.json codegen.ts ./
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev:codegen"]

# Production
FROM base AS build
COPY . .
RUN npm install
RUN npm run graphql-codegen
RUN npm run build

# (Using Nginx)
FROM nginx:1.27.4 AS production 
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]