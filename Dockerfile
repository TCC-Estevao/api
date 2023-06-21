FROM node AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

RUN npm install -g pnpm 
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "dev" ]