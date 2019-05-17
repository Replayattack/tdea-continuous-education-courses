const fs = require('fs')

function readCoursesFile() {
  return fs.promises.readFile('./courses.json', {
    encoding: 'utf-8'
  })
    .then(JSON.parse)
}

async function printCourses() {
  const { courses } = await readCoursesFile();
  let timeout = 2000
  courses.forEach(({ id, name, price, duration }) => {
    setTimeout(() => {
      console.log(`El curso ${name} identificado con el número ${id}, tiene una duración de ${duration} y un valor de ${price} pesos.`);
    }, timeout);
    timeout += 2000
  })
}

module.exports = {
  printCourses,
  readCoursesFile
}
