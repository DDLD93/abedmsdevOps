FROM node:stretch-slim
LABEL author="Umar Adamu Jere"
WORKDIR /app
COPY package.json .
COPY . .
RUN ["npm", "install"]
EXPOSE 3000
CMD ["npm", "start"]