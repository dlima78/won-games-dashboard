import React from 'react'
import userEvent from '@testing-library/user-event'
import faker from '@faker-js/faker'

import FormSignIn from '@/presentation/components/form-sign-in'
import { renderWithTheme } from '@/utils/helper'
import { screen, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { AuthenticationSpy } from '@/tests/domain/mocks'
import { ValidationSpy, SaveAccessTokenMock } from '@/tests/presentation/mocks'
import { InvalidCredentialsError } from '@/domain/errors'

const history = createMemoryHistory()
type SutTypes = {
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const makeSut = (): SutTypes => {
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  renderWithTheme(
    <Router navigator={history} location='/sing-in' >
      <FormSignIn validation={validationSpy} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />
    </Router>
  )
  return {
    validationSpy,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateField('Email', email)
  populateField('Password', password)
  const button = screen.getByRole('button', { name: /Entrar/i })
  userEvent.click(button)
  await waitFor(() => screen.getByRole('link', { name: /criar conta/i }))
}

const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByPlaceholderText(fieldName)
  userEvent.type(input, value)
}

describe('<FormSignIn />', () => {
  test('Should render the form with initial state', () => {
    makeSut()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /esqueceu a senha\?/i })).toBeInTheDocument()
    const button = screen.getByRole('button', { name: /Entrar/i })
    expect(button).toBeInTheDocument()
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  test('Should go to signup page', () => {
    makeSut()
    expect(screen.getByRole('link', { name: /criar conta/i })).toBeInTheDocument()
    userEvent.click(screen.getByRole('link', { name: /criar conta/i }))
    expect(history.location.pathname).toBe('/sign-up')
  })

  test('should call Validation with correct email', () => {
    const { validationSpy } = makeSut()
    const email = faker.internet.email()
    populateField('Email', email)
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('should call Validation with correct password', () => {
    const { validationSpy } = makeSut()
    const password = faker.internet.password()
    populateField('Password', password)
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('should show email error if Validation fails', () => {
    const { validationSpy } = makeSut()
    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage
    populateField('Email')
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('should show password error if Validation fails', () => {
    const { validationSpy } = makeSut()
    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage
    populateField('Password')
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('should show spínner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('should show call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByText(error.message)).toBeInTheDocument()
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  test('should call SaveAccessToken on success', async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit()
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.location.pathname).toBe('/')
  })

  test('should present error if SaveAccessToken fails', async () => {
    const { saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByText(error.message)).toBeInTheDocument()
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })
})
