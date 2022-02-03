import { HttpPostClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (data: HttpRequest<T>): Promise<HttpResponse<R>> {
    this.url = data.url
    this.body = data.body
    return await Promise.resolve(this.response)
  }
}
