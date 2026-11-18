FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY backend/package.json ./
RUN npm install --omit=dev
COPY backend/ ./
RUN mkdir -p /app/storage/evidence && chown -R node:node /app
USER node
EXPOSE 5000
CMD ["npm","start"]