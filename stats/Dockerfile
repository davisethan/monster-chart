FROM mongo:3.2.4
COPY stats.json /stats.json
CMD mongoimport --host mongodb --db stats --collection pokemon --file stats.json
