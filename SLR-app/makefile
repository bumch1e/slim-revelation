all: help

help: ## Comando de ayuda
	@echo ""
	@echo "Regla                           Explicación"
	@echo "-----                           -----------"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_-]+:.*##/ {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""

start-project: up ## Inicia la app en el puerto 5173
	@echo "[+] Iniciando aplicación..."
	@npm run dev

up: ## Levanta TODOS los contendores disponibles
	@echo "[+] Levantando todos los contenedores..."
	@docker compose up -d --build

down: ## Baja TODOS los contendores disponibles
	@echo "[+] Bajando todos los contenedores..."
	@docker compose down

start: ## Empieza TODOS los contenedores disponibles
	@echo "[+] Iniciando todos los contenedores..."
	@docker compose start

stop: ## Detiene TODOS los contenedores disponibles
	@echo "[+] Deteniendo todos los contenedores..."
	@docker compose stop


