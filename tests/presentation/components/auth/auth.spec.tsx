import React from 'react'
import Auth from '@/presentation/templates/auth'
import { renderWithTheme } from '@/utils/helper'
import { screen } from '@testing-library/react'

describe('<Auth />', () => {
  test('Should render all components and children', () => {
    renderWithTheme(<Auth title='title'>
      <input type="text" />
    </Auth>)

    expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
