export class MinLengthError extends Error {
  constructor (length: number) {
    super(`O campo precisa ter no minimo ${length} caracteres`)
    this.name = 'MinLengthError'
  }
}
