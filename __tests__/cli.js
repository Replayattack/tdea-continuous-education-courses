const fs = require('fs')
const {
  printCourses,
  readCoursesFile,
  searchCourse
} = require('../cli')

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}))

describe('readCoursesFile', () => {
  it('should return the courses.json file content', () => {
    const fileContent = `{"courses": []}`
    fs.promises.readFile.mockResolvedValue(fileContent)

    const expected = { courses: [] }

    const result = readCoursesFile()
    expect(result).resolves.toEqual(expected)
  })
})

describe('printCourses', () => {
  jest.useFakeTimers()

  it('should print the courses every two seconds', async () => {
    const TWO_SECONDS = 2000
    const fileContent =
      `{
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

    await printCourses()
    expect(setTimeout).toHaveBeenCalledTimes(3)

    jest.advanceTimersByTime(TWO_SECONDS)
    expect(setTimeout).toBeCalledWith(expect.any(Function), TWO_SECONDS)

    jest.advanceTimersByTime(TWO_SECONDS * 2)
    expect(setTimeout).toBeCalledWith(expect.any(Function), TWO_SECONDS * 2)

    jest.advanceTimersByTime(TWO_SECONDS * 3)
    expect(setTimeout).toBeCalledWith(expect.any(Function), TWO_SECONDS * 3)
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

  it('throws an Error when it doesn\'t receive arguments', async () => {
    try {
      await searchCourse()
    } catch (error) {
      expect(error).toEqual(new Error('it must be called with an argument'))
    }
  })

  it('throws a TypeError when its argument isn\'t a number', async () => {
    try {
      await searchCourse('')
    } catch (error) {
      expect(error).toEqual(new TypeError('id must be a number'))
    }
  })

  it('returns undefined when it doesn\'t find a course', async () => {
    const course = await searchCourse(2)

    expect(course).toBeUndefined()
  })

  it('returns a course when it finds him', async () => {
    const course = await searchCourse(1)

    expect(course).toBeDefined()
  })
})
