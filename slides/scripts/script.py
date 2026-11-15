import argparse
import os
import textwrap

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


ARCHIVO_CSV = "data.csv"
CARPETA_GRAFICOS = "../img/plots"
ITERACION_ACTUAL = 2

METRICAS = {
    "tiempo": {
        "columna": "tiempo_segundos",
        "titulo": "Tiempo promedio por tarea",
        "eje_y": "Tiempo (segundos)",
    },
    "esfuerzo": {
        "columna": "esfuerzo_porcentaje",
        "titulo": "Esfuerzo promedio por tarea",
        "eje_y": "Esfuerzo (%)",
    },
    "satisfaccion": {
        "columna": "satisfaccion",
        "titulo": "Satisfacción promedio por tarea",
        "eje_y": "Satisfacción (1-7)",
    },
    "errores": {
        "columna": "errores_percibidos",
        "titulo": "Errores percibidos por tarea",
        "eje_y": "Usuarios que percibieron errores (%)",
    },
}

NOMBRES_EXPERIMENTOS = {
    1: "Registro de ingesta calórica",
    2: "Información sobre alimentación saludable",
    3: "Construcción de hábitos saludables",
}


def cargar_datos():
    df = pd.read_csv(ARCHIVO_CSV)

    columnas_requeridas = [
        "iteracion",
        "experimento",
        "usuario",
        "tarea",
        "tiempo_segundos",
        "esfuerzo_porcentaje",
        "satisfaccion",
        "errores_percibidos",
    ]

    faltantes = set(columnas_requeridas) - set(df.columns)

    if faltantes:
        raise ValueError(
            f"Faltan columnas en el CSV: {', '.join(faltantes)}"
        )

    for columna in [
        "iteracion",
        "experimento",
        *[m["columna"] for m in METRICAS.values()],
    ]:
        df[columna] = pd.to_numeric(df[columna], errors="coerce")

    return df


def preparar_metrica(df, metrica):
    columna = METRICAS[metrica]["columna"]

    datos = df.dropna(subset=[columna]).copy()

    # Convertir errores binarios a porcentaje.
    if metrica == "errores":
        datos[columna] *= 100

    return datos


def generar_grafico(df, experimento, metrica):
    datos = preparar_metrica(df, metrica)

    datos = datos[datos["experimento"] == experimento]

    if datos.empty:
        print(
            f"Sin datos para experimento {experimento}, "
            f"métrica {metrica}."
        )
        return

    columna = METRICAS[metrica]["columna"]

    # Promediar por tarea e iteración.
    resumen = (
        datos.groupby(["tarea", "iteracion"])[columna]
        .mean()
        .unstack("iteracion")
    )

    # Mantener el orden original de las tareas.
    orden_tareas = datos["tarea"].drop_duplicates().tolist()
    resumen = resumen.reindex(orden_tareas)

    fig, ax = plt.subplots(figsize=(11, 6))

    resumen.plot(
        kind="bar",
        ax=ax,
        width=0.75,
        rot=0,
    )

    ax.set_title(
        f"{METRICAS[metrica]['titulo']}\n"
        f"Experimento {experimento}: "
        f"{NOMBRES_EXPERIMENTOS.get(experimento, '')}"
    )

    ax.set_xlabel("Tarea")
    ax.set_ylabel(METRICAS[metrica]["eje_y"])

    etiquetas = [
        "\n".join(textwrap.wrap(tarea, width=22))
        for tarea in resumen.index
    ]

    ax.set_xticklabels(etiquetas, rotation=0, ha="center")

    ax.legend(
        title="Iteración",
        labels=[
            f"Iteración {int(columna)}"
            for columna in resumen.columns
        ],
    )

    ax.grid(axis="y", linestyle="--", alpha=0.4)
    ax.set_axisbelow(True)

    fig.tight_layout()

    carpeta = os.path.join(
        CARPETA_GRAFICOS,
        f"experimento_{experimento}"
    )

    os.makedirs(carpeta, exist_ok=True)

    ruta = os.path.join(carpeta, f"{metrica}.png")

    fig.savefig(ruta, dpi=300, bbox_inches="tight")
    plt.close(fig)

    print(f"Gráfico generado: {ruta}")


def generar_grafico_general(df, metrica):
    datos = preparar_metrica(df, metrica)

    # Considerar exclusivamente la iteración actual.
    datos = datos[datos["iteracion"] == ITERACION_ACTUAL]

    if datos.empty:
        print(f"Sin datos para el gráfico general de {metrica}.")
        return

    columna = METRICAS[metrica]["columna"]

    # Promedio por experimento y tarea.
    resumen = (
        datos.groupby(["experimento", "tarea"])[columna]
        .mean()
    )

    fig, ax = plt.subplots(figsize=(15, 7))

    posiciones = []
    etiquetas = []
    separadores = []
    posicion = 0

    for experimento in [1, 2, 3]:
        if experimento not in resumen.index.get_level_values(0):
            continue

        tareas = resumen.loc[experimento]

        valores = tareas.values
        nombres = tareas.index.tolist()

        x = np.arange(posicion, posicion + len(valores))

        ax.bar(
            x,
            valores,
            label=(
                f"Experimento {experimento}: "
                f"{NOMBRES_EXPERIMENTOS[experimento]}"
            ),
        )

        posiciones.extend(x)
        etiquetas.extend([
            f"E{experimento}\n"
            + "\n".join(textwrap.wrap(nombre, width=20))
            for nombre in nombres
        ])

        posicion += len(valores)

        if experimento < 3 and len(valores) > 0:
            separadores.append(posicion - 0.5)

    ax.set_title(
        f"{METRICAS[metrica]['titulo']}\n"
        f"Resultados generales - Iteración {ITERACION_ACTUAL}"
    )

    ax.set_xlabel("Experimentos y tareas")
    ax.set_ylabel(METRICAS[metrica]["eje_y"])

    ax.set_xticks(posiciones)
    ax.set_xticklabels(etiquetas, rotation=0, ha="center")

    for separador in separadores:
        ax.axvline(
            separador,
            linestyle="--",
            alpha=0.4,
        )

    ax.legend(title="Experimentos")

    ax.grid(axis="y", linestyle="--", alpha=0.4)
    ax.set_axisbelow(True)

    fig.tight_layout()

    carpeta = os.path.join(CARPETA_GRAFICOS, "general")
    os.makedirs(carpeta, exist_ok=True)

    ruta = os.path.join(carpeta, f"{metrica}.png")

    fig.savefig(ruta, dpi=300, bbox_inches="tight")
    plt.close(fig)

    print(f"Gráfico general generado: {ruta}")


def main():
    parser = argparse.ArgumentParser(
        description="Generación de gráficos de pruebas UX."
    )

    parser.add_argument(
        "--experimento",
        choices=["todos", "1", "2", "3"],
        default="todos",
        help="Experimento que se desea graficar.",
    )

    parser.add_argument(
        "--metrica",
        choices=["todas", *METRICAS.keys()],
        default="todas",
        help="Métrica que se desea graficar.",
    )

    parser.add_argument(
        "--solo-individuales",
        action="store_true",
        help="Generar solamente gráficos individuales.",
    )

    parser.add_argument(
        "--solo-generales",
        action="store_true",
        help="Generar solamente gráficos generales.",
    )

    args = parser.parse_args()

    if args.solo_individuales and args.solo_generales:
        parser.error(
            "No puedes utilizar --solo-individuales y "
            "--solo-generales al mismo tiempo."
        )

    df = cargar_datos()

    experimentos = (
        [1, 2, 3]
        if args.experimento == "todos"
        else [int(args.experimento)]
    )

    metricas = (
        list(METRICAS.keys())
        if args.metrica == "todas"
        else [args.metrica]
    )

    # Gráficos individuales.
    if not args.solo_generales:
        for experimento in experimentos:
            for metrica in metricas:
                generar_grafico(df, experimento, metrica)

    # Gráficos generales de la iteración actual.
    if not args.solo_individuales:
        for metrica in metricas:
            generar_grafico_general(df, metrica)


if __name__ == "__main__":
    main()

