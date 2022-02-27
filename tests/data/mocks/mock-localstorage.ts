import { SetStorarge } from '@/data/protocols/cache/set-storage'

export class SetStorageStub implements SetStorarge {
  key: string
  value: any
  async set (key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
  }
}