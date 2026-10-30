#show link: underline
#show link: set text(blue)

#set document(
  title: [INF332 - Proyecto 2 - Tarea 9 - MVP React]
)

#set text(
  lang: "es",
)

#let image-space = v(12pt)
#let WIDTH = 70%

#align(center + horizon)[#title()]

#v(10pt)

#align(center + horizon)[== Integrantes]

#v(5pt)

#align(center + horizon)[
#table(
  columns: (auto),
  inset: 10pt,
  table.header(
    [*Nombre*],
  ),
  [Bastián Campos],
  [Cristobal Cordova],
  [Benjamín Echeverría],
  [Javier Gacitua],
  [Lucas Roilar],
  [José Ignacio Ventura],
)
]

#v(10pt)

#align(center + horizon)[== Enlace a repositorio en Github]

#v(5pt)

#align(center + horizon)[
  #box(
    inset: 20pt,
    stroke: black,
  )[
    #link("https://github.com/bumch1e/slim-revelation")
  ]
]

#pagebreak()

== Metas de usuarios implementadas

#align(center)[
  #table(
    columns: (auto, auto),
    inset: 5pt,
    table.header(
      [*Metrica de negocio*],
      [*Meta de usuario*],
    ),
    /// Primera meta
    [RETENCIÓN],
    [Registrar su ingesta diaria de calorías de forma rápida y sin distracciones.],
    /// Segunda meta
    [RETENCIÓN],
    [Obtener información útil para su alimentación por la aplicación.],
    /// Tercera meta
    [RETENCIÓN],
    [Aprender a construir y mantener buenos hábitos.],
  )
]

== Flujo esperado (_Screeshots_)

=== Registro de ingesta diaria

#figure(
  image(width: WIDTH, "img/register-food.png"),
  caption: [El usuario indica el alimento que ingirió recientemente
  junto con sus calorías para añadirlas a su registro de calorías diario y
  actualizar el valor de calorías consumidas.]
)

#image-space

#figure(
  image(width: WIDTH, "img/frequent-food.png"),
  caption: [El usuario puede añadir alimentos frecuentas para acelerar el
  proceso de registro y eliminar alimentos de su historial si así lo desea.]
)

=== Obtención de información útil

#figure(
  image(width: WIDTH, "img/consultor.png"),
  caption: [El usuario indica una pregunta propia o utiliza las preguntas frecuentes
  para obtener información sobre algo que lo aqueja.]
)

#image-space

#figure(
  image(width: WIDTH, "img/consultor-answers.png"),
  caption: [El consultor responde la pregunta realizada de manera breve y concreta 
  con fase en una publicación especializada.]
)

#image-space

#figure(
  image(width: WIDTH, "img/sources.png"),
  caption: [El consultor entrega _links_ al usuario por si quiere revisar alguna
  fuente oficial de manera más directa.]
)

=== Construcción y mantención de hábitos saludables

#figure(
  image(width: WIDTH, "img/habit-progress.png"),
  caption: [El usuario puede revisar el estado de sus hábitos con respecto a su racha
  de registros o los puntos de logro que lleva hasta el momento. También puede registrar
  un entrenamiento o una compra saludable de manera automática con las actividades ya
  definidas usando alguno de los botones.]
)

#image-space

#figure(
  image(width: WIDTH, "img/activities.png"),
  caption: [El usuario ingresa los entrenamientos y compras saludables que hace diariamente
  además de marcar aquellos ya definidos por él mismo que ya cumplió o deshacer su marca
  si se ha equivocado en hacerlo.]
)

#image-space

#figure(
  image(width: WIDTH, "img/achievements-grid.png"),
  caption: [El usuario puede ver un sistema de logros con las metas que ha cumplido hasta el
  momento desde que utiliza la aplicación para motivarse a seguir manteniendo sus hábitos.
  Los logros cambian su estado dependiendo de si el usuario los ha cumplido recientemente o no
  lo ha hecho en absoluto.]
)

#image-space

#figure(
  image(width: WIDTH, "img/new-achievement.png"),
  caption: [Notificación del sistema para el usuario donde se indica que este obtuvo un nuevo
  logro con sus acciones en la aplicación.]
)


