import { FieldValidation } from '@/validation/protocols'
import { InvalidCompareFieldsError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: object): Error {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidCompareFieldsError() : null
  }
}
