import { ValidationBuilder as Builder } from '@/main/builders'
import { ValidationComposite } from '@/main/composite'
import { makeSignUpValidation } from '@/main/factories/validation'

describe('SignUpValidationFactory', () => {
  test('should make ValidationComposite with correct validators', () => {
    const composite = makeSignUpValidation()

    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(3).build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build(),
      ...Builder.field('passwordConfirmation').required().sameAs('password').build()
    ]))
  })
})
