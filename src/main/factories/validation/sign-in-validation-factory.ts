import { ValidationBuilder } from '@/main/builders'
import { ValidationComposite } from '@/main/composite'

export const makeSignInValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
}
