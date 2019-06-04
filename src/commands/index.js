const { printCourses } = require('../cli')

exports.command = '$0'

exports.describe = 'Default command.'

exports.builder = {}

exports.handler = () => {
  printCourses()
}
