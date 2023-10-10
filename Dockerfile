FROM node:alpine3.18

WORKDIR /home/node

COPY package* ./

ENV NPM_CONFIG_LOGLEVEL info
RUN npm install --production

COPY . .

EXPOSE 8080 8080

CMD ["node", "index.js"]