const util = require('util')
const execFile = util.promisify(require('child_process').execFile)
const yargs = require('yargs')
const command = require('../../commands/enroll')

it("prints the help message when it doesn't receive all command options", async () => {
  const parser = yargs.command(command)
  const result = await new Promise(resolve => {
    parser.parse('enroll', (error, argv, output) => resolve(output))
  })

  expect(result).toEqual(
    expect.stringContaining('Enroll a student to a course.')
  )
})

it('prints the successful message when a student is enrolled', async () => {
  const { stdout: result } = await execFile('node', [
    'src/index.js',
    'enroll',
    '-i',
    123456789,
    '-c',
    1,
    '-n',
    'John Doe'
  ])
  expect(result.trimRight()).toEqual(
    'El estudiante fue pre-matriculado correctamente.'
  )
})
