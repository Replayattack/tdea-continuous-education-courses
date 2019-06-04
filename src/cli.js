const fs = require('fs')
const yargs = require('yargs')

function readCoursesFile() {
  return fs.promises.readFile('./courses.json', {
    encoding: 'utf-8'
  })
    .then(JSON.parse)
}

async function printCourses(logger = console) {
  const { courses } = await readCoursesFile();
  let timeout = 2000
  courses.forEach(({ id, name, price, duration }) => {
    setTimeout(() => {
      logger.log(`El curso ${name} identificado con el número ${id}, tiene una duración de ${duration} y un valor de ${price} pesos.`);
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

async function enroll({ course, id, name, logger = console } = {}) {
  if (arguments.length !== 1)
    throw new Error('it must be called with an argument')
  if (course === undefined)
    throw new Error('its argument must contain the course property')
  if (typeof course !== 'number' && !Number.isInteger(course))
    throw new TypeError('course property must be an integer')
  if (id === undefined)
    throw new Error('its argument must contain the id property')
  if (typeof id !== 'number' && !Number.isInteger(id))
    throw new TypeError('id property must be an integer')
  if (name === undefined)
    throw new Error('its argument must contain the name property')
  if (typeof name !== 'string')
    throw new TypeError('name property must be a string')

  const _course = await searchCourse(course)
  const student = { id, name }
  if (_course === undefined)
    logger.info(`El curso identificado con el número ${course} no fue encontrado.`)
  else {
    await saveEnroll({ course: _course, student })
    logger.info('El estudiante fue pre-matriculado correctamente.')
  }
}

async function saveEnroll({ course, student } = { course: {}, student: {} }) {
  const data = Object.values(course)
    .concat(Object.values(student))
    .concat('\n')
    .join(',')

  await fs.promises.appendFile('db.txt', data)
}

function main() {
  yargs
    .commandDir('commands')
    .demandCommand()
    .version()
    .help()
    .argv
}

module.exports = {
  main,
  enroll,
  printCourses,
  readCoursesFile,
  saveEnroll,
  searchCourse
}
