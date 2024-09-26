FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ENV VUE_APP_AWS_SYNOPSIS_BASE_URL=https://desenv.synopsis-ia.com
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "serve"]

