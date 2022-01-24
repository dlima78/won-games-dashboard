import React from 'react'
import Button from '@/presentation/components/button'
import { renderWithTheme } from '@/utils/helper'
import { screen } from '@testing-library/react'

describe('<Button />', () => {
  test('Should render medium size by default', () => {
    renderWithTheme(<Button>Button</Button>)

    expect(screen.getByRole('button', { name: /button/i })).toHaveStyle({
      height: '4rem',
      padding: '0.8rem 2.4rem',
      fontSize: '1.4rem'
    })
  })
  test('Should render small size if small size propterty is provided', () => {
    renderWithTheme(<Button size='small'>Button</Button>)

    expect(screen.getByRole('button', { name: /button/i })).toHaveStyle({
      height: '3rem',
      fontSize: '1.2rem'
    })
  })

  test('Should render large size if large size property is provided', () => {
    renderWithTheme(<Button size="large" >Button</Button>)

    expect(screen.getByRole('button', { name: /button/i })).toHaveStyle({
      height: '5rem',
      padding: '0.8rem 3.2rem',
      fontSize: '1.6rem'
    })
  })

  test('should render a fullWidth version', () => {
    renderWithTheme(<Button fullWidth>Buy now</Button>)

    expect(screen.getByRole('button', { name: /Buy now/i })).toHaveStyle({
      width: '100%'
    })
  })

  test('should render Button as a link', () => {
    renderWithTheme(<Button as="a" href="/link">Link Button</Button>)

    expect(screen.getByRole('link', { name: /link button/i })).toHaveAttribute('href', '/link')
  })
})
