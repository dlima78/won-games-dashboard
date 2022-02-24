import { AxiosHttpClient } from '@/infra/http'
import axios from 'axios'
import { mockAxios, mockHttpResponse } from '@/tests/infra/mocks'
import { mockHttpRequest } from '@/tests/data/mocks'

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
  test('should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockHttpRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()

    const axiosHttpResponse = mockHttpResponse()
    mockedAxios.post.mockClear().mockResolvedValue(axiosHttpResponse)
    const httpResponse = await sut.post(mockHttpRequest())

    expect(httpResponse).toEqual({
      statusCode: axiosHttpResponse.status,
      body: axiosHttpResponse.data
    })
  })

  test('Should return the correct statusCode and body on failure', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    const promise = sut.post(mockHttpRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
