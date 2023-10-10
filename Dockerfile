FROM node:alpine3.18 AS builder

RUN apk add python make g++

WORKDIR /app
COPY package* ./

ENV NPM_CONFIG_LOGLEVEL info
RUN npm install --production

FROM node:alpine3.18

USER node

WORKDIR /home/node

COPY --from=builder /app .

COPY . .

EXPOSE 8080 8080

CMD ["node", "index.js"]