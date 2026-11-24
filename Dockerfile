# Stage 1: Dependencies
FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# Stage 2: Production
FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./
COPY src ./src

EXPOSE 3000

CMD ["node", "server.js"]