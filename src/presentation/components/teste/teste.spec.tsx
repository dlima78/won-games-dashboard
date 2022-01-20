import React from 'react'
import Teste from '.'
import { renderWithTheme } from '@/utils/helper'
import { screen } from '@testing-library/react'

describe('<Login />', () => {
  test('Should render heading', () => {
    renderWithTheme(<Teste />)
    expect(screen.getByRole('heading')).toHaveStyle({ color: '#f9f9f9' })
  })
})
