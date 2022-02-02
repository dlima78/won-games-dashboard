import faker from '@faker-js/faker'
import { Authentication } from '@/domain/usecases/authentication'
import { mockAccountModel } from '.'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()
