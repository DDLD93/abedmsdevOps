FROM node:slim
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY server.js .
COPY /build .
EXPOSE 7000
CMD ["node", "server"]