# Estágio 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Instalação e Geração do Prisma
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate

# Build do projeto
RUN npm run build

# Estágio 2: Produção
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos necessários
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .

# Inicia a aplicação usando o arquivo de saída diretamente
CMD ["node", "dist/server.js"]