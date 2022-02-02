export type HttpRequest = {
  url: string
}

export interface HttpPostClient {
  post: (data: HttpRequest) => Promise<void>
}
