FROM node:latest

COPY ./ /opt/webapp
WORKDIR /opt/webapp

RUN npm install
CMD node ./index.js
