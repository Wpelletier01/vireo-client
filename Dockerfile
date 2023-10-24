FROM node:18-alpine

WORKDIR /build 

COPY client/package.json /build/
COPY client/public/  /build/public
COPY client/src/  /build/src

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
