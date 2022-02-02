export type HttpRequest = {
  url: string
  body?: object
}

export interface HttpPostClient {
  post: (data: HttpRequest) => Promise<void>
}
