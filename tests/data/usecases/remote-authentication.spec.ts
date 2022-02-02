import { RemoteAuthentication } from '@/data/usecases/authentication/'
import { HttpPostClientSpy } from '@/tests/data/mocks/http'
import { mockAuthenticationParams } from '@/tests/domain/mocks/mock-authentication'
import faker from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    httpPostClientSpy,
    sut
  }
}

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthenticationParams())
    expect(httpPostClientSpy.url).toBe(url)
  })
  test('should call HttpPostClient with correct body ', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const params = mockAuthenticationParams()
    await sut.auth(params)
    expect(httpPostClientSpy.body).toEqual(params)
  })
})
