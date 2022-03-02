import { AddAccount } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccount.Params, RemoteAddAccount.Model>
  ) {}

  async add (params: AddAccount.Params): Promise<any> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      case HttpStatusCode.badRequest: throw new UnexpectedError()
      case HttpStatusCode.serverError: throw new UnexpectedError()
      default: break
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
