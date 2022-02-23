export interface FieldValidation {
  field: string
  validate: (input: string) => Error
}
