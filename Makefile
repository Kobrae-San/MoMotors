COMPOSE = docker compose
PM=npm # Package manager
ENV_FILE=.env

YELLOW = \033[33m
RED = \033[31m
GREEN = \033[32m
BLUE = \033[34m
NC = \033[0m # No Color
INFO = @echo "$(BLUE)➜$(NC)"
SUCCESS = @echo "$(GREEN)✔$(NC)"
WARNING = @echo "$(YELLOW)⚠$(NC)"

.PHONY: help
help: ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) }' $(MAKEFILE_LIST)

##@ Develop
.PHONY: dev
up: ## Run all containers in dev mode
	$(COMPOSE) up -d

build: ## Build with no cache
	$(COMPOSE) build --no-cache

down: ## Down all containers
	$(COMPOSE) down

env:
	@if [ -f $(ENV_FILE) ]; then echo "$(ENV_FILE) already exists!"; exit 1; fi
	@touch $(ENV_FILE)
	@echo "Creating $(ENV_FILE) with default values..."
	@echo "POSTGRES_DB_HOST=database" >> $(ENV_FILE)
	@echo "POSTGRES_DB_NAME=groupe7-dev" >> $(ENV_FILE)
	@echo "POSTGRES_DB_PORT=5432" >> $(ENV_FILE)
	@echo "POSTGRES_DB_USER=root" >> $(ENV_FILE)
	@echo "POSTGRES_DB_PASSWORD=root" >> $(ENV_FILE)
	@echo "CLIENT_HOST=http://localhost:4200" >> $(ENV_FILE)
	@echo "MS_TRANSACTION_HOST=http://localhost:3001" >> $(ENV_FILE)
	@echo "MS_USER_HOST=http://localhost:3002" >> $(ENV_FILE)
	@echo "MS_VEHICLE_HOST=http://localhost:3003" >> $(ENV_FILE)
	@echo "Done!"

##@ Utilities
.PHONY: status
status: ## Check the status of Docker containers
	$(COMPOSE) ps

.DEFAULT_GOAL := help
