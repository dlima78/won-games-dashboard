import faker from '@faker-js/faker'
import { Authentication } from '@/domain/usecases/authentication'
import { mockAccountModel } from '.'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: Authentication.Params
  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
