FROM node:19

WORKDIR /server/services/users

COPY package*.json  ./

RUN npm install

COPY . .

ENV PORT=process.env.PORT

EXPOSE 4002

CMD [ "npm","start" ]
