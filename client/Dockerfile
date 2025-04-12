FROM node:22 as dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.27-alpine as prod

COPY --from=build /app/dist/client/browser/ /usr/share/nginx/html

EXPOSE 80
