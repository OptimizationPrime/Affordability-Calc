FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run production
EXPOSE 3002
CMD ["npm", "run", "start"]