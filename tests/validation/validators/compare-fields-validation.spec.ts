import { CompareFieldsValidation } from '@/validation/validators'
import faker from '@faker-js/faker'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid ', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError('password'))
  })
})
