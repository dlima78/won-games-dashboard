import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string
  validate (fieldName: string, input: object): string {
    this.fieldName = fieldName
    this.fieldValue = input[this.fieldName]
    return this.errorMessage
  }
}
