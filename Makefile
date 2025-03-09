SHELL := /bin/bash
date := $(shell date +\%Y\%m\%d-\%H\%M\%S)

dev:
	docker compose -f docker-compose.yml build
	docker compose -f docker-compose.yml up

graphiql:
	npm --prefix graphiql run dev

prod:
	mkdir -p ./log
	docker compose -f docker-compose.yml -f docker-compose.override.yml --env-file .env build --progress=plain 2>&1 | tee ./log/build-$(date).log
	docker compose -f docker-compose.yml -f docker-compose.override.yml --env-file .env up -d

stop:
	docker compose --file docker-compose.yml down

fclean: stop
	docker network rm -f hsl-network
	docker rm -f hsl-frontend hsl-backend
	docker image rm -f corsearch-assignment-backend corsearch-assignment-frontend

.PHONY: dev graphiql prod clean fclean