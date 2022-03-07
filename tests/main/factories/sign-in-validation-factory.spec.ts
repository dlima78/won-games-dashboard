import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'
import { ValidationComposite } from '@/main/composite'
import { makeSignInValidation } from '@/main/factories/validation'

describe('SingInValidationFactory', () => {
  test('should make ValidationComposite with correct validators', () => {
    const composite = makeSignInValidation()

    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5)
    ]))
  })
})
