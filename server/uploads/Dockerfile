FROM node:19

WORKDIR /server/uploads

COPY package*.json  ./

RUN npm install

COPY . .

ENV PORT=process.env.PORT

EXPOSE 4004

CMD [ "npm","start" ]
