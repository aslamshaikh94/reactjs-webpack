FROM node:current-alpine3.15 as builder

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

RUN npm run build

#Run Steps
FROM nginx:1.19.8-alpine
COPY --from=builder /app/build user/share/nginx/html