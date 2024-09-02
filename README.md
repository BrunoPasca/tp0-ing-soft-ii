Una tabla de contenido.
Una introducción con no más de un párrafo pequeño y conciso sobre la solución planteada.
Una sección sobre qué fue lo más desafiante del proyecto.
Un apartado de pre-requisitos listando lo necesario para levantar el entorno de desarrollo, especificando los lenguajes y versiones de los manejadores de paquetes necesarios.
Link al “user-guide” de la libreria que se uso para testear, o en su defecto link al repo. e.g: Junit, gin-gonic
Comandos para construir la imagen de Docker.
Comandos para correr la base de datos.
Comandos para correr la imagen del servicio.

## Contenidos
En este readme se pueden encontrar:
 - Introduccion
 - Desafios
 - Prerequisitos
 - Referencias
 - Comandos

## Introducción
Este es un proyecto en snap planteado para poder almacenar Snaps y poder obtenerlos. Para esto elegi usar el framework de NestJS ya que si bien no poseia mucha experiencia, considero que es muy interesante y que puede ser muy utilizada a futuro. Para este ejercicio se planteo: Un servidor en NestJS y una base de datos en Postgres. Se utilizo un docker compose para que esten en la misma red y que se puedan conectar.

## Desafios
El principal desafio fue sin ninguna duda la implementacion de los servicios en docker. Si bien ya conocia la existencia de esta tecnologia y la habia utilizado. Nunca habia tenido que hacer un dockerfile y un docker compose desde cero. Por lo que significo un gran desafio y por suerte logre aprender lo suficiente.

## Prerequisitos
Tener instalado node, version 20 o superior
Tener instalado npm, version 10 o superior
Tener instalado docker, version utilizada: 27.1.2


## Referencias
https://nestjs.com/
https://docs.nestjs.com/fundamentals/testing
https://docs.nestjs.com/techniques/logger

## Comandos (Linux)
Levantar produccion (ya crea la imagen, levanta el servidor en el puerto 8080)
make docker-compose-up-prod

Levantar development (puerto 3000)
make docker-compose-up-dev
npm run start:dev

Testear
npm run test:e2e

Si se quiere levantar unicamente la imagen hacer:
docker build . -t ing-soft-serv:latest

Otros comandos que me resultaron utiles:
Revisar si hay un proceso corriendo en el puerto 5432: sudo lsof -i :5432
Matar ese proceso: sudo kill {pid}