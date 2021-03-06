import { CompareFieldsValidation } from '@/validation/validators'
import faker from '@faker-js/faker'
import { InvalidCompareFieldsError } from '@/validation/errors'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid ', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toEqual(new InvalidCompareFieldsError())
  })

  test('should return falsy if value is valid ', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.random.word()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
