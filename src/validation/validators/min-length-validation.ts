import { MinLengthError } from '../errors'
import { FieldValidation } from '../protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}
  validate (input: object): Error {
    return input[this.field]?.length < this.minLength ? new MinLengthError(this.minLength) : null
  }
}
