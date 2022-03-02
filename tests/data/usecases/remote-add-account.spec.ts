import { mockAddAccountParams } from '@/tests/domain/mocks'
import { HttpPostClientSpy } from '@/tests/data/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { RemoteAddAccount } from '@/data/usecases'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
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

  test('should throws EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('should throws UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
