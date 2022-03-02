import { AddAccount } from '@/domain/usecases'
import { HttpPostClient } from '@/data/protocols/http'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccount.Params, RemoteAddAccount.Model>
  ) {}

  async add (params: AddAccount.Params): Promise<any> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    return await Promise.resolve('')
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
