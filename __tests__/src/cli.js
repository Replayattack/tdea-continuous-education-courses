const fs = require('fs')
const {
  enroll,
  printCourses,
  readCoursesFile,
  saveEnroll,
  searchCourse
} = require('../../src/cli')

jest.mock('fs', () => ({
  promises: {
    appendFile: jest.fn(),
    readFile: jest.fn()
  }
}))

describe('readCoursesFile', () => {
  it('return the courses.json file content', () => {
    const fileContent = `{"courses": []}`
    fs.promises.readFile.mockResolvedValue(fileContent)

    const expected = { courses: [] }

    const result = readCoursesFile()
    expect(result).resolves.toEqual(expected)
  })
})

describe('printCourses', () => {
  jest.useFakeTimers()

  it('print the courses every two seconds', async () => {
    const TWO_SECONDS = 2000
    const logger = {
      log: jest.fn()
    }
    const fileContent = `{
        "courses": [
          {
            "id": 1,
            "name": "Introducción a la programación",
            "price": 150000,
            "duration": "64 horas"
          },
          {
            "id": 2,
            "name": "Certificación en Node.js",
            "price": 200000,
            "duration": "64 horas"
          },
          {
            "id": 3,
            "name": "Inglés",
            "price": 150000,
            "duration": "64 horas"
          }
        ]
      }`
    fs.promises.readFile.mockResolvedValue(fileContent)

    await printCourses(logger)
    expect(setTimeout).toHaveBeenCalledTimes(3)
    expect(setTimeout).toBeCalledWith(expect.any(Function), TWO_SECONDS)
    expect(setTimeout).toBeCalledWith(expect.any(Function), TWO_SECONDS * 2)
    expect(setTimeout).toBeCalledWith(expect.any(Function), TWO_SECONDS * 3)

    jest.advanceTimersByTime(TWO_SECONDS)
    jest.advanceTimersByTime(TWO_SECONDS * 2)
    jest.advanceTimersByTime(TWO_SECONDS * 3)
    expect(logger.log).toHaveBeenCalledTimes(3)
  })
})

describe('searchCourse', () => {
  beforeEach(() => {
    const content = `
    {
      "courses": [
        {
          "id": 1,
          "name": "Node.js Certification",
          "duration": "32 hours",
          "price": 0
        }
      ]
    }
    `
    fs.promises.readFile.mockResolvedValue(content)
  })

  it("throws an Error when it doesn't receive arguments", async () => {
    try {
      await searchCourse()
    } catch (error) {
      expect(error).toEqual(new Error('it must be called with an argument'))
    }
  })

  it("throws a TypeError when its argument isn't a number", async () => {
    try {
      await searchCourse('')
    } catch (error) {
      expect(error).toEqual(new TypeError('id must be a number'))
    }
  })

  it("returns undefined when it doesn't find a course", async () => {
    const course = await searchCourse(2)

    expect(course).toBeUndefined()
  })

  it('returns a course when it finds him', async () => {
    const course = await searchCourse(1)

    expect(course).toBeDefined()
  })
})

describe('enroll', () => {
  it('throws an Error when it is called without arguments', async () => {
    try {
      await enroll()
    } catch (error) {
      expect(error).toEqual(new Error('it must be called with an argument'))
    }
  })

  it("throws an Error when its argument doesn't contain the course property", async () => {
    try {
      await enroll({
        id: 1,
        name: 'John Doe'
      })
    } catch (error) {
      expect(error).toEqual(
        new Error('its argument must contain the course property')
      )
    }
  })

  it("throws a TypeError when its course property isn't a integer", async () => {
    try {
      await enroll({
        course: '1',
        id: 1,
        name: 'John Doe'
      })
    } catch (error) {
      expect(error).toEqual(new TypeError('course property must be an integer'))
    }
  })

  it("throws an Error when its argument doesn't contain the id property", async () => {
    try {
      await enroll({
        course: 1,
        name: 'John Doe'
      })
    } catch (error) {
      expect(error).toEqual(
        new Error('its argument must contain the id property')
      )
    }
  })

  it("throws a TypeError when its id property isn't a integer", async () => {
    try {
      await enroll({
        course: 1,
        id: '1',
        name: 'John Doe'
      })
    } catch (error) {
      expect(error).toEqual(new TypeError('id property must be an integer'))
    }
  })

  it("throws an Error when its argument doesn't contain the name property", async () => {
    try {
      await enroll({
        course: 1,
        id: 1
      })
    } catch (error) {
      expect(error).toEqual(
        new Error('its argument must contain the name property')
      )
    }
  })

  it("throws a TypeError when its name property isn't a string", async () => {
    try {
      await enroll({
        course: 1,
        id: 1,
        name: 5
      })
    } catch (error) {
      expect(error).toEqual(new TypeError('name property must be a string'))
    }
  })

  it("prints an alert message when it doesn't find the course", async () => {
    const logger = {
      info: jest.fn()
    }

    await enroll({
      id: 1,
      name: 'John Doe',
      course: 4,
      logger
    })

    expect(logger.info).toBeCalled()
    expect(logger.info).toHaveBeenCalledTimes(1)
  })

  it('prints a message when the enroll was saved', async () => {
    const logger = {
      info: jest.fn()
    }

    await enroll({
      course: 1,
      id: 123456789,
      name: 'John Doe',
      logger
    })

    expect(logger.info).toBeCalled()
    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(fs.promises.appendFile).toBeCalled()
    expect(fs.promises.appendFile).toHaveBeenCalledTimes(1)
  })
})

describe('saveEnroll', () => {
  it('saves the enroll process data and its course in a file', async () => {
    const course = {
      id: 1,
      name: 'Node.js Certification',
      price: 0,
      duration: '32 hours'
    }
    const student = {
      id: 123456789,
      name: 'John Doe'
    }

    const DATABASE = 'db.txt'
    const DATA = Object.values(course)
      .concat(Object.values(student))
      .concat('\n')
      .join(',')

    await saveEnroll({
      course,
      student
    })

    expect(fs.promises.appendFile).toBeCalled()
    expect(fs.promises.appendFile).toHaveBeenCalledTimes(1)
    expect(fs.promises.appendFile).toBeCalledWith(DATABASE, DATA)
  })

  it('appends a new enroll process to the last line of the file', async () => {
    const courses = [
      {
        id: 1,
        name: 'Node.js Certification',
        price: 0,
        duration: '32 hours'
      },
      {
        id: 2,
        name: 'English',
        price: 150000,
        duration: '64 hours'
      }
    ]
    const students = [
      {
        id: 123456789,
        name: 'John Doe'
      },
      {
        id: 987654321,
        name: 'Jane Doe'
      }
    ]

    await saveEnroll({
      course: courses[0],
      student: students[0]
    })
    await saveEnroll({
      course: courses[1],
      student: students[1]
    })

    expect(fs.promises.appendFile).toHaveBeenCalledTimes(2)
  })
})
