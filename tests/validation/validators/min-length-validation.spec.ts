import { MinLengthValidation } from '@/validation/validators'
import { MinLengthError } from '@/validation/errors'
import faker from '@faker-js/faker'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('should return erro if value is invalid ', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toEqual(new MinLengthError(5))
  })
})
