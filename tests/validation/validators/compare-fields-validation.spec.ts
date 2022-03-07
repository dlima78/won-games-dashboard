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
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    })
    expect(error).toEqual(new InvalidCompareFieldsError())
  })

  test('Should return falsy if compare is valid', () => {
    const field = 'any_field'
    const fieldToCompare = 'other_field'
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)

    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })

    expect(error).toBeFalsy()
  })
})
