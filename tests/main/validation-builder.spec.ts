import { ValidationBuilder } from '@/main/builders'
import {
  EmailValidation,
  RequiredFieldValidation,
  MinLengthValidation,
  CompareFieldsValidation
} from '@/validation/validators'
import faker from '@faker-js/faker'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('should return MinLengthValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).min(5).build()
    expect(validations).toEqual([new MinLengthValidation(field, 5)])
  })

  test('should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fiedToCompare = faker.database.column()
    const validations = ValidationBuilder.field(field).sameAs(fiedToCompare).build()
    expect(validations).toEqual([new CompareFieldsValidation(field, fiedToCompare)])
  })

  test('should return list of validations', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).required().min(5).email().build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, 5),
      new EmailValidation(field)
    ])
  })
})
