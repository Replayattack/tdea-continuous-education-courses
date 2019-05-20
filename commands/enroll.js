const { enroll } = require('../cli')

exports.command = ['enroll', 'inscribir']

exports.describe = 'Enroll a student to a course.'

exports.builder = {
  identification: {
    alias: ['i', 'id', 'cedula'],
    demandOption: true,
    description: 'Student\'s id',
    type: 'number'
  },
  name: {
    alias: ['n', 'nombre'],
    demandOption: true,
    description: 'Student\'s name',
    type: 'string'
  },
  course: {
    alias: ['c', 'curso'],
    demandOption: true,
    description: 'Course\'s id',
    type: 'number'
  }
}

exports.handler = (argv) => {
  enroll(argv)
}
