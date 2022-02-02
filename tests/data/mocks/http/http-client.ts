import { HttpPostClient, HttpRequest } from '@/data/protocols/http/http-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  async post (data: HttpRequest): Promise<void> {
    this.url = data.url
    this.body = data.body
    return await Promise.resolve()
  }
}
