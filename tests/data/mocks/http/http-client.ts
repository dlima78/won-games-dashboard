import { HttpPostClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async post (data: HttpRequest): Promise<HttpResponse> {
    this.url = data.url
    this.body = data.body
    return await Promise.resolve(this.response)
  }
}
