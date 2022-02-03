import faker from '@faker-js/faker'
import axios from 'axios'

export const mockHttpResponse = (): any => ({
  status: faker.datatype.number(),
  data: faker.datatype.json()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
