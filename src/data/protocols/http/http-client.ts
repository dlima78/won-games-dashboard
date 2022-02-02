export type HttpRequest = {
  url: string
  body?: object
}

export interface HttpPostClient {
  post: (data: HttpRequest) => Promise<HttpResponse>
}

export enum HttpStatusCode {
  noContent = 204,
  unauthorized = 401
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
