import React from 'react'
import FormSignIn from '@/presentation/components/form-sign-in'
import { renderWithTheme } from '@/utils/helper'
import { RenderResult, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'

const history = createMemoryHistory()
const makeSut = (): RenderResult => {
  return renderWithTheme(
    <Router navigator={history} location='/sing-in' >
      <FormSignIn />
    </Router>
  )
}

describe('<FormSignIn />', () => {
  test('Should render the form', () => {
    makeSut()

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument()
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
})
