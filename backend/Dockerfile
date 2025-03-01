FROM node:23-alpine3.20 AS base
WORKDIR /app

FROM base AS development
CMD ["npm", "run", "dev"]

FROM base AS build
COPY . .
RUN npm install
RUN npm run build

FROM node:23-alpine3.20 AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
CMD ["node", "./dist/server.js"]