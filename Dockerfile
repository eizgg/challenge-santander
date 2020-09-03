FROM node:12.16-alpine

WORKDIR /

COPY package*.json resources server /

RUN  npm install

COPY . /

ENV NODE_ENV production
ENV PORT 8080
ENV LOCAL false
ENV CLOUDANT_USERNAME 39e0763e-3022-4bea-b698-60dd3f1d616d-bluemix
ENV CLOUDANT_PASSWORD a9afca5926e2274981bcda635ef1ac0be5ca16c2370130718412bd3744642bb4

EXPOSE 8080

CMD [ "npm", "run", "start"]