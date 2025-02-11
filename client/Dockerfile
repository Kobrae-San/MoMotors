FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

EXPOSE 3000

CMD ["ng", "serve", "--host", "0.0.0.0" ]
