SHELL := /bin/bash
PWD := $(shell pwd)
docker-image:
	docker build . -t ing-soft-serv:latest

.PHONY: docker-image

docker-compose-up-dev:
	docker compose --env-file .env.docker -f docker-compose-dev.yml up
.PHONY: docker-compose-up-dev

docker-compose-up-prod: docker-image
	docker compose --env-file .env.docker -f docker-compose.yml up
.PHONY: docker-compose-up-prod

docker-compose-logs-dev:
	docker compose -f docker-compose-dev.yaml logs -f

docker-compose-logs-prod:
	docker compose -f docker-compose.yaml logs -f
.PHONY: docker-compose-logs