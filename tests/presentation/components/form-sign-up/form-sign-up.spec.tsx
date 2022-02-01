import React from 'react'
import FormSignUp from '@/presentation/components/form-sign-up'
import { renderWithTheme } from '@/utils/helper'
import { RenderResult, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

const history = createMemoryHistory()
const makeSut = (): RenderResult => {
  return renderWithTheme(
    <Router navigator={history} location='/sing-up' >
      <FormSignUp />
    </Router>
  )
}

describe('<FormSignUp />', () => {
  test('Should render the form', () => {
    makeSut()

    expect(screen.getByPlaceholderText(/nome/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirme a senha')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument()
  })

  test('Should go to signin page', () => {
    makeSut()
    expect(screen.getByRole('link', { name: 'Já possui conta?' })).toBeInTheDocument()
    userEvent.click(screen.getByRole('link', { name: 'Já possui conta?' }))
    expect(history.location.pathname).toBe('/sign-in')
  })
})
