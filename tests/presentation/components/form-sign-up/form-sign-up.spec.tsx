import React from 'react'
import FormSignUp from '@/presentation/components/form-sign-up'
import { renderWithTheme } from '@/utils/helper'
import { screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { ValidationSpy } from '@/tests/presentation/mocks'
import faker from '@faker-js/faker'

const history = createMemoryHistory()

type SutTypes = {
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  renderWithTheme(
    <Router navigator={history} location='/sing-up' >
      <FormSignUp validation={validationSpy} />
    </Router>
  )
  return {
    validationSpy
  }
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
})
