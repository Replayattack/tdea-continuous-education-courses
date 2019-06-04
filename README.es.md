# TdeA Continuous Education Courses
[![pipeline status](https://gitlab.com/Replayattack/tdea-continuous-education-courses/badges/master/pipeline.svg)](https://gitlab.com/Replayattack/tdea-continuous-education-courses/commits/master)
[![coverage report](https://gitlab.com/Replayattack/tdea-continuous-education-courses/badges/master/coverage.svg)](https://gitlab.com/Replayattack/tdea-continuous-education-courses/commits/master)

Esta aplicación de línea de comandos permite listar los cursos ofrecidos por la dependencia de Educación Continua del Tecnológico de Antioquia y pre-matricularse al curso interesado.

## Paquetes usados
1. yargs
2. jest

## Características
1. Listar cursos.
2. Crear pre-matricula con la información del estudiante y curso.

## Instalación
```sh
# Clonar el repositorio
git clone https://github.com/Replayattack/tdea-continuous-education-courses
# Cambiar al directorio de la aplicación
cd tdea-continuous-education-courses/
# Instalar las dependencias de la aplicación
npm install
# Ejecutar las pruebas de la aplicación para asegurar su funcionamiento en tu computadora
npm run test
# Remover el archivo db.txt creado por las pruebas
rm db.txt
```

## Uso
```sh
# Muestra la lista de cursos disponibles
node index.js
# Muestra el menú de ayuda
node index.js --help
# Muestra el menú de ayuda del comando inscribir
node index.js inscribir --help
# Pre-matricula un estudiante a un curso
node index.js inscribir --curso 3 --nombre 'John Doe' --cedula 123456789
```

## Desarrolladores
- Daniel G.

## Licencia
Ver el archivo **LICENSE**.

## Referencias
README creado en base al siguiente artículo: [A meaningful README.md](https://dev.to/pratikaambani/a-meaningful-readmemd-565a)
