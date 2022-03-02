import { mockAddAccountParams } from '@/tests/domain/mocks'
import { HttpPostClientSpy } from '@/tests/data/mocks'
import { RemoteAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import faker from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Params, AddAccount.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccount.Params, AddAccount.Model>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('should call HttpPostClient with correct URL ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body ', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const params = mockAddAccountParams()
    await sut.add(params)
    expect(httpPostClientSpy.body).toEqual(params)
  })
})
