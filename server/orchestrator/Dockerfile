FROM node:19

WORKDIR /server/orchestrator

COPY package*.json  ./

RUN npm install

COPY . .

ENV PORT=process.env.PORT

EXPOSE 4000

CMD [ "npm","start" ]