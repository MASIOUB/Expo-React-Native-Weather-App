FROM node:16

WORKDIR /app

COPY package.json .

RUN npx expo install

COPY . .

EXPOSE 19000

CMD ["npx", "expo", "start"]