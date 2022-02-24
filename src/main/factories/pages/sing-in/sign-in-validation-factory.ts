import { ValidationBuilder } from '@/main/builders'
import { ValidationComposite } from '@/main/composite'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
}
