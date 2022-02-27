import { SetStorarge } from '@/data/protocols/cache/set-storage'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorarge) {}
  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
    return await Promise.resolve()
  }
}