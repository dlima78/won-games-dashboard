import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'
import { ValidationComposite } from '@/main/composite'
import { makeSignUpValidation } from '@/main/factories/validation'

describe('SignUpValidationFactory', () => {
  test('should make ValidationComposite with correct validators', () => {
    const composite = makeSignUpValidation()

    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('name'),
      new MinLengthValidation('name', 3),
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5),
      new RequiredFieldValidation('passwordConfirmation'),
      new MinLengthValidation('passwordConfirmation', 5)
    ]))
  })
})
