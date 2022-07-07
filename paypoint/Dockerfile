FROM node:slim
WORKDIR /app

# Install app dependencies
COPY package.json .

# Bundle app source
COPY server.js .
COPY /build ./build
RUN ["npm", "install"]
EXPOSE 5000
CMD ["node", "server"]