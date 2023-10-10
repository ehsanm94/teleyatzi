FROM node:alpine3.18 AS builder

RUN apk add python make g++

WORKDIR /app
COPY package* ./

ENV NPM_CONFIG_LOGLEVEL info
RUN npm install --production

FROM node:alpine3.18

RUN addgroup -g 1000 node \
    && adduser -u 1000 -G node -s /bin/sh -D node

USER node

WORKDIR /home/node

COPY --chown=node:node --from=builder /app .

COPY --chown=node:node . .

EXPOSE 8080 8080

CMD ["node", "index.js"]