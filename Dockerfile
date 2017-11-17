FROM node:carbon-alpine
COPY ./ /opt/webapp
WORKDIR /opt/webapp
RUN yarn install
EXPOSE 8080
CMD node ./index.js
