import faker from '@faker-js/faker'
import { SetStorageStub } from '@/tests/data/mocks'
import { LocalSaveAccessToken } from '@/data/usecases/local-access-token'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageStub: SetStorageStub
}

const makeSut = (): SutTypes => {
  const setStorageStub = new SetStorageStub()
  const sut = new LocalSaveAccessToken(setStorageStub)
  return {
    sut,
    setStorageStub
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorarge with correct token ', async () => {
    const { sut, setStorageStub } = makeSut()
    const token = faker.datatype.uuid()
    await sut.save(token)
    expect(setStorageStub.key).toBe('accessToken')
    expect(setStorageStub.value).toBe(token)
  })
})
