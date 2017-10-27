FROM node:latest
COPY ./ /opt/webapp
WORKDIR /opt/webapp
RUN npm install
EXPOSE 80
CMD node ./index.js
