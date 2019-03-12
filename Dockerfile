FROM node:10.15.3

RUN mkdir -p /usr/app/src
WORKDIR /usr/app

COPY . .

EXPOSE 3000

CMD ["npm","run", "start"]