export class InvalidCompareFieldsError extends Error {
  constructor () {
    super('Confirmação de senha inválida')
    this.name = 'InvalidCompareFieldsError'
  }
}
