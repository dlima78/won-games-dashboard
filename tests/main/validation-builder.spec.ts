import { ValidationBuilder } from '@/main/builders'
import {
  EmailValidation,
  RequiredFieldValidation
} from '@/validation/validators'
import faker from '@faker-js/faker'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = faker.random.word()
    const validations = ValidationBuilder.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('should return EmailValidation', () => {
    const field = faker.random.word()
    const validations = ValidationBuilder.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })
})
