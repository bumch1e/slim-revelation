FILENAME = MVP_report

all: compile view

compile:
	@echo "[+] Compilando..."
	@typst c $(FILENAME).typ
	@echo "[+] Proyecto compilado!"

view:
	@echo "[+] Mostrando archivo..."
	@zathura $(FILENAME).pdf
