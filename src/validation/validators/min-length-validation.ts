import { MinLengthError } from '../errors'
import { FieldValidation } from '../protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}
  validate (input: string): Error {
    return new MinLengthError(this.minLength)
  }
}
