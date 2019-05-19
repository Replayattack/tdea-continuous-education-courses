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

async function searchCourse(id) {
  if (arguments.length !== 1)
    throw new Error('it must be called with an argument')
  if (typeof id !== 'number')
    throw new TypeError('id must be a number')

  const { courses } = await readCoursesFile()
  return courses.find(course => course.id === id)
}

module.exports = {
  printCourses,
  readCoursesFile,
  searchCourse
}
