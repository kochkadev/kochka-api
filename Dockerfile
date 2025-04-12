FROM node:23-bullseye-slim AS deps
WORKDIR /app

COPY package*.json .
COPY .npmrc .npmrc
COPY .env .env

ARG GITHUB_TOKEN

RUN --mount=type=cache,target=/root/.npm,sharing=locked npm ci

FROM node:23-bullseye-slim AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:23-bullseye-slim
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json /app/tsconfig.json /app/nest-cli.json ./
COPY --from=builder /app/prism[a] ./prisma

CMD ["npm", "run", "start:prod"]
