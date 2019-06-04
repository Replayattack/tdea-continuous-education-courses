const yargs = require('yargs')
const command = require('../../../src/commands/')

it('returns the package version with the argument --version', async () => {
  const expected = process.env.npm_package_version
  const parser = yargs.command(command)
  const result = await new Promise(resolve => {
    parser.parse('--version', (error, argv, output) => {
      resolve(output)
    })
  })

  expect(result).toBe(expected)
})

it('returns the help output with the argument --help', async () => {
  const command = require('../../../src/commands/')
  const parser = yargs.command(command)
  const result = await new Promise(resolve => {
    parser.parse('--help', (error, argv, output) => {
      resolve(output)
    })
  })

  expect(result).toEqual(expect.stringContaining('Default command.'))
})
