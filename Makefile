dev:
	docker-compose run --service-ports --rm webapp

sink:
	docker rm -f `docker ps -aq`
