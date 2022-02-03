import { HttpRequest } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async post (params: HttpRequest<any>): Promise<void> {
    await axios.post(params.url)
  }
}
