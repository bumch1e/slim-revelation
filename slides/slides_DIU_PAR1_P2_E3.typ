#import "@preview/diatypst:0.9.3": *

#show: slides.with(
  title: "Alimentación saludable", // Required
  subtitle: "Proyecto 2 | Entrega 3",
  date: "16/11/2026",
  authors: (
    "B. Campos",
    "C. Cordova",
    "B. Echeverría",
    "J. Gacitua",
    "L. Roilar",
    "J. I. Ventura",
  ),
  ratio: 16/9,
  count: "number",
  toc: false,
  title-color: green.darken(35%),
)

#import "preamble.typ": *

#set par(justify: false)

#set text(lang: "es")

= Preliminares

== Descripción del problema

#figure(
  image(width: 70%, "/img/og_fatsecret.png"),
  caption: [Caso de estudio _fatsecret_.],
)

== Artefacto Persona

#let persona = {
  figure(
    image(width: 55%, "/img/persona.png"),
    caption: [Artefacto persona del grupo más numeroso.],
  )
}
#persona

= Hipótesis y metas de usuarios

== Hipótesis (1/2)

#let hip_table2 = {
  [
    #table(
      columns: 4,
      inset: 8pt,
      align: horizon,
      table.header(
        [*Lograremos...*], [*...si este usuario...*], [*...puede lograr...*], [*... con esta función...*],
      ),
      /// Meta 1
      [*ACTIVACIÓN*],
      [Federico García],
      [Acostumbrarse a registrar lo que hace con respecto a su alimentación],
      [Interfaz minimalista y sencilla con opciones de personalización y funcionalidades varias],
      /// Meta 2
      [*ADQUISICIÓN*],
      [Federico García],
      [Bajar de peso],
      [Ecosistema atractivo de registro de calorías diario y hábitos saludables en tiempo real],
      /// Meta 3
      [*REFERENCIA*],
      [Federico García],
      [Revisar su progreso y compartirlo con amigos],
      [Gráficos y progreso visualizable con datos históricos],
    )
  ]
}

#align(center)[#hip_table2]

== Hipótesis (2/2)

#let hip_table2 = {
  [
    #table(
      columns: 4,
      inset: 8pt,
      align: horizon,
      table.header(
        [*Lograremos...*], [*...si este usuario...*], [*...puede lograr...*], [*... con esta función...*],
      ),
      /// Meta 1
      [*RETENCIÓN*],
      [Federico García],
      [Controlar lo que consume durante el día],
      [Registro de ingesta de calorías diarias a través de un formulario sencillo y directo],
      /// Meta 2
      [*ACTIVACIÓN*],
      [Federico García],
      [Obtener información útil para llevar una alimentación saludable],
      [Consultor que aporta recomendaciones con base en fuentes oficiales],
      /// Meta 3
      [*RETENCIÓN*],
      [Federico García],
      [Aprender a construir y mantener buenos hábitos],
      [Sistema de logros para fomentar el registro de entrenamientos y compras saludables],
    )
  ]
}

#align(center)[#hip_table2]

= Experimentos

== Experimento 1

#let exp1_ss = {
  figure(
    image(width: 100%, "/img/register-food.png"),
    caption: [Interfaz del experimento 1 (Formulario de registro).]
  )
}

#let exp1_tasks = {
  [ 
    #strong[Tareas por realizar:]

    #align(left)[
      - Ingresar el nombre del alimento y las calorías consumidas de algo que se haya consumido
        durante el día.
      #v(5pt)
      - Seleccionar un _alimento frecuente_ y añadirlo al registro.
      #v(5pt)
      - Verificar que el total de calorías del día se haya actualizado en la pantalla principal.
    ]
  ]
}

#exp_layout(exp1_ss, exp1_tasks)

== Experimento 2

#let exp2_ss = {
  figure(
    image(width: 100%, "/img/consultor.png"),
    caption: [Interfaz del experimento 2 (Preguntas frecuentes).]
  )
}

#let exp2_tasks = {
  [ 
    #strong[Tareas por realizar:]

    #align(left)[
      - Consultar una duda que se tenga relacionada con la alimentación saludable con palabras propias.
      #v(5pt)
      - Obtener una respuesta para alguna de las preguntas frecuentes.
      #v(5pt)
      - Verificar de dónde proviene la información entrando a alguno de los links de referencias.
    ]
  ]
}

#exp_layout(exp2_ss, exp2_tasks)

== Experimento 3

#let exp3_ss = {
  figure(
    image(width: 100%, "/img/achievements-grid.png"),
    caption: [Interfaz del experimento 3 (Sistema de logros).],
  )
}

#let exp3_tasks = {
  [ 
    #strong[Tareas por realizar:]

    #align(left)[
      - Ingresar manualmente un entrenamiento que se haya hecho recientemente.
      #v(5pt)
      - Presionar el botón de acceso rápido para marcar una acción realizada.
      #v(5pt)
      - Revisar el sistema de logros y conseguir alguno que todavía no esté completado.
    ]
  ]
}

#exp_layout(exp3_ss, exp3_tasks)

= Resultados

== Comparación: Experimento 1 (Tiempo empleado)

#let exp1_time =  {
  figure(
    image(width: 70%, "/img/plots/experimento_1/tiempo.png"),
    caption: [Tiempo empleado en el experimento 1 entre iteraciones.]
  )
}

#exp1_time

== Comparación: Experimento 1 (Grado de esfuerzo)

#let exp1_effort =  {
  figure(
    image(width: 70%, "/img/plots/experimento_1/esfuerzo.png"),
    caption: [Grado de esfuerzo en el experimento 1 entre iteraciones.]
  )
}

#exp1_effort

== Comparación: Experimento 1 (Escala de satisfacción)

#let exp1_satisfaction =  {
  figure(
    image(width: 70%, "/img/plots/experimento_1/satisfaccion.png"),
    caption: [Escala de satisfacción en el experimento 1 entre iteraciones.]
  )
}

#exp1_satisfaction

== Comparación: Experimento 1 (Errores percibidos)

#let exp1_errors =  {
  figure(
    image(width: 70%, "/img/plots/experimento_1/errores.png"),
    caption: [Cantidad de errores percibidos en el experimento 1 entre iteraciones.]
  )
}

#exp1_errors

== Comparación: Experimento 2 (Tiempo empleado)

#let exp2_time =  {
  figure(
    image(width: 70%, "/img/plots/experimento_2/tiempo.png"),
    caption: [Tiempo empleado en el experimento 2 entre iteraciones.]
  )
}

#exp2_time

== Comparación: Experimento 2 (Grado de esfuerzo)

#let exp2_effort =  {
  figure(
    image(width: 70%, "/img/plots/experimento_2/esfuerzo.png"),
    caption: [Grado de esfuerzo en el experimento 2 entre iteraciones.]
  )
}

#exp2_effort

== Comparación: Experimento 2 (Escala de satisfacción)

#let exp2_satisfaction =  {
  figure(
    image(width: 70%, "/img/plots/experimento_2/satisfaccion.png"),
    caption: [Escala de satisfacción en el experimento 2 entre iteraciones.]
  )
}

#exp2_satisfaction

== Comparación: Experimento 2 (Errores percibidos)

#let exp2_errors =  {
  figure(
    image(width: 70%, "/img/plots/experimento_2/errores.png"),
    caption: [Cantidad de errores percibidos en el experimento 2 entre iteraciones.]
  )
}

#exp2_errors

== Comparación: Experimento 3 (Tiempo empleado)

#let exp3_time =  {
  figure(
    image(width: 70%, "/img/plots/experimento_3/tiempo.png"),
    caption: [Tiempo empleado en el experimento 3 entre iteraciones.]
  )
}

#exp3_time

== Comparación: Experimento 3 (Grado de esfuerzo)

#let exp3_effort =  {
  figure(
    image(width: 70%, "/img/plots/experimento_3/esfuerzo.png"),
    caption: [Grado de esfuerzo en el experimento 3 entre iteraciones.]
  )
}

#exp3_effort

== Comparación: Experimento 3 (Escala de satisfacción)

#let exp3_satisfaction =  {
  figure(
    image(width: 70%, "/img/plots/experimento_3/satisfaccion.png"),
    caption: [Escala de satisfacción en el experimento 3 entre iteraciones.]
  )
}

#exp3_satisfaction

== Comparación: Experimento 3 (Errores percibidos)

#let exp3_errors =  {
  figure(
    image(width: 70%, "/img/plots/experimento_3/errores.png"),
    caption: [Cantidad de errores percibidos en el experimento 3 entre iteraciones.]
  )
}

#exp3_errors

== Generales: Tiempo empleado

#let gen_time =  {
  figure(
    image(width: 70%, "/img/plots/general/tiempo.png"),
    caption: [Tiempo empleado entre experimentos.]
  )
}

#gen_time

== Generales: Grado de esfuerzo

#let gen_effort = {
  figure(
    image(width: 70%, "/img/plots/general/esfuerzo.png"),
    caption: [Grado de esfuerzo entre experimentos.]
  )
}

#gen_effort

== Generales: Escala de satisfacción

#let gen_satisfaction =  {
  figure(
    image(width: 70%, "/img/plots/general/satisfaccion.png"),
    caption: [Escala de satisfacción entre experimentos.]
  )
}

#gen_satisfaction

== Generales: Errores percibidos

#let gen_errors =  {
  figure(
    image(width: 70%, "/img/plots/general/errores.png"),
    caption: [Cantidad de errores percibidos entre experimentos.]
  )
}

#gen_errors

= Conclusiones

== Conclusiones

#align(left)[
  - Resultados obtenidos.
  - Futuro del prototipo.
  - Relevancia en la vida profesional.
]
