import React from 'react'
import faker from '@faker-js/faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'

import FormSignUp from '@/presentation/components/form-sign-up'
import { ValidationSpy, SaveAccessTokenMock } from '@/tests/presentation/mocks'
import { AddAccountSpy } from '@/tests/domain/mocks'
import { renderWithTheme } from '@/utils/helper'
import { InvalidCredentialsError } from '@/domain/errors'

const history = createMemoryHistory()

type SutTypes = {
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  renderWithTheme(
    <Router navigator={history} location='/sing-up' >
      <FormSignUp validation={validationSpy} addAccount={addAccountSpy} saveAccessToken={saveAccessTokenMock} />
    </Router>
  )
  return {
    validationSpy,
    addAccountSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  name = faker.internet.email(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateField('Nome', name)
  populateField('Email', email)
  populateField('Senha', password)
  populateField('Confirme a senha', password)

  const button = screen.getByRole('button', { name: /Cadastrar/i })
  userEvent.click(button)
  await waitFor(() => screen.getByRole('link', { name: /já possui conta\?/i }))
}

const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByPlaceholderText(fieldName)
  userEvent.type(input, value)
}

describe('<FormSignUp />', () => {
  test('Should render the form with initial state', () => {
    makeSut()

    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirme a senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /já possui conta\?/i })).toBeInTheDocument()
  })

  test('Should go to signin page', () => {
    makeSut()
    expect(screen.getByRole('link', { name: 'Já possui conta?' })).toBeInTheDocument()
    userEvent.click(screen.getByRole('link', { name: 'Já possui conta?' }))
    expect(history.location.pathname).toBe('/sign-in')
  })

  test('should show name error if Validation fails', () => {
    const { validationSpy } = makeSut()
    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage
    populateField('Nome')
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
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
    populateField('Senha')
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('should show passwordConfirmation error if Validation fails', () => {
    const { validationSpy } = makeSut()
    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage
    populateField('Confirme a senha')
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('should call Validation with correct name', () => {
    const { validationSpy } = makeSut()
    const name = faker.name.findName()
    populateField('Nome', name)
    expect(validationSpy.fieldName).toBe('name')
    expect(validationSpy.fieldValue).toBe(name)
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
    populateField('Senha', password)
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('should call Validation with correct passwordConfirmation', () => {
    const { validationSpy } = makeSut()
    const password = faker.internet.password()
    populateField('Confirme a senha', password)
    expect(validationSpy.fieldName).toBe('passwordConfirmation')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('should show spínner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByText(error.message)).toBeInTheDocument()
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
  })

  test('should call SaveAccessToken on success', async () => {
    const { addAccountSpy, saveAccessTokenMock } = makeSut()
    await simulateValidSubmit()
    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
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
