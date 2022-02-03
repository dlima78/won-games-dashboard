import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  jest.mock('axios')
  return axios as jest.Mocked<typeof axios>
}
