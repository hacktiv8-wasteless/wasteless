FROM node:19

WORKDIR /server/services/app

COPY package*.json  ./

RUN npm install

COPY . .

ENV PORT=process.env.PORT

EXPOSE 4001

CMD [ "npm","start" ]
