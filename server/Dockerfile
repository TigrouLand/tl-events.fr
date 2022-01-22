FROM node:17-alpine3.12

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn build

EXPOSE 7070
CMD ["node", "dist"]
