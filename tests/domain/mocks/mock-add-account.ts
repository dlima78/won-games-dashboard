import faker from '@faker-js/faker'
import { AddAccount } from '../usecases'
import { mockAccountModel } from '@/tests/domain/mocks'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  accountModel = mockAddAccountModel()
  params: AddAccount.Params
  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params
    return await Promise.resolve(this.accountModel)
  }
}
