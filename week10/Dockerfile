FROM node
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json package-lock.json index.js ./
COPY resources ./resources

RUN npm install
EXPOSE 8080
CMD node index.js
