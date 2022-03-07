import { MinLengthValidation } from '@/validation/validators'
import { MinLengthError } from '@/validation/errors'
import faker from '@faker-js/faker'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  test('should return erro if value is invalid ', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(3) })
    expect(error).toEqual(new MinLengthError(5))
  })

  test('should return falsy if value is valid ', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('should return falsy if field does not exists in schema ', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
