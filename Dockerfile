FROM node:16-alpine AS builder

WORKDIR /app

COPY ./package.json ./package-lock.json  ./

RUN yarn install

COPY . .

RUN yarn build

RUN yarn install --production

FROM node:16-alpine
WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8000

CMD yarn start