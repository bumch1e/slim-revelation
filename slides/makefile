JOBNAME = slides_DIU_PAR1_P2_E3

.PHONY = all compile view

all: compile view

compile:
	@echo "[+] Compilando..."
	@typst c $(JOBNAME).typ
	@echo "[+] Proyecto compilado!"

view:
	@zathura $(JOBNAME).pdf
