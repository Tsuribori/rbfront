FROM node:8.16-alpine

RUN mkdir -p /app/frontend

WORKDIR /app/frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install  --network-timeout 1000000

COPY . /app/frontend

EXPOSE 3000
EXPOSE 9229

CMD ["yarn", "start"]
