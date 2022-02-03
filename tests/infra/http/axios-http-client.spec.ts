import faker from '@faker-js/faker'
import { AxiosHttpClient } from '@/infra/http'
import axios from 'axios'
import { mockAxios } from '@/tests/infra/mocks'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct url', async () => {
    const { sut, mockedAxios } = makeSut()
    const url = faker.internet.url()
    await sut.post({
      url
    })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
