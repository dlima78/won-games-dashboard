import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'

describe('<Login />', () => {
  test('Should render heading', () => {
    render(<Login />)
    expect(screen.getByRole('heading', { name: /react avançado/i })).toBeInTheDocument()
  })
})
