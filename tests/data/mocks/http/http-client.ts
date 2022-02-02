import { HttpPostClient, HttpRequest } from '@/data/protocols/http/http-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  async post (data: HttpRequest): Promise<void> {
    this.url = data.url
    return await Promise.resolve()
  }
}
