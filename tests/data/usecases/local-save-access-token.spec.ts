import faker from '@faker-js/faker'
import { SetStorageMock } from '@/tests/data/mocks'
import { LocalSaveAccessToken } from '@/data/usecases'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct token ', async () => {
    const { sut, setStorageMock } = makeSut()
    const token = faker.datatype.uuid()
    await sut.save(token)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(token)
  })

  test('should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const promise = sut.save(faker.datatype.uuid())
    await expect(promise).rejects.toThrow(new Error())
  })
})
