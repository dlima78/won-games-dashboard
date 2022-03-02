import faker from '@faker-js/faker'
import { AddAccount } from '../usecases'
import { mockAccountModel } from '@/tests/domain/mocks'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()
