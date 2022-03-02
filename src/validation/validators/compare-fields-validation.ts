import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '../errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare
  ) {}

  validate (input: string): Error {
    return new InvalidFieldError('password')
  }
}
