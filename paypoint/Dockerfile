FROM node:slim
WORKDIR /app

# Install app dependencies
RUN npm init -y
RUN npm i express cors

# Bundle app source
COPY server.js .
COPY /build ./build
EXPOSE 5000
CMD ["node", "server"]