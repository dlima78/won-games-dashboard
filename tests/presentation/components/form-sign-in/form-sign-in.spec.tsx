import React from 'react'
import FormSignIn from '@/presentation/components/form-sign-in'
import { renderWithTheme } from '@/utils/helper'
import { screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import faker from '@faker-js/faker'
import { Validation } from '@/presentation/protocols'

const history = createMemoryHistory()
type SutTypes = {
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string
  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  renderWithTheme(
    <Router navigator={history} location='/sing-in' >
      <FormSignIn validation={validationSpy} />
    </Router>
  )
  return {
    validationSpy
  }
}

describe('<FormSignIn />', () => {
  test('Should render the form with initial state', () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = null
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
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

  test('should render forgot password link ', () => {
    makeSut()

    expect(screen.getByRole('link', { name: /esqueceu a senha\?/i })).toBeInTheDocument()
  })

  test('should call Validation with correct email', () => {
    const { validationSpy } = makeSut()
    const emailInput = screen.getByPlaceholderText(/email/i)
    const email = faker.internet.email()
    userEvent.type(emailInput, email)
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('should call Validation with correct password', () => {
    const { validationSpy } = makeSut()
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const password = faker.internet.password()
    userEvent.type(passwordInput, password)
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('should show email error if Validation fails', () => {
    const { validationSpy } = makeSut()

    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage
    const emailInput = screen.getByPlaceholderText(/email/i)
    const email = faker.internet.email()
    userEvent.type(emailInput, email)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('should show password error if Validation fails', () => {
    const { validationSpy } = makeSut()

    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const password = faker.internet.password()
    userEvent.type(passwordInput, password)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('should show spínner on submit', () => {
    makeSut()
    const emailInput = screen.getByPlaceholderText(/email/i)
    const email = faker.internet.email()
    userEvent.type(emailInput, email)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const password = faker.internet.password()
    userEvent.type(passwordInput, password)
    const button = screen.getByRole('button', { name: /Entrar/i })
    userEvent.click(button)
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
})
