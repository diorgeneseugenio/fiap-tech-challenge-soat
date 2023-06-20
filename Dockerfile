FROM node:16-alpine
ADD . /app
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD yarn run dev