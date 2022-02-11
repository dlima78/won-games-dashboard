import React from 'react'
import Textfield from '@/presentation/components/text-field'
import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme } from '@/helpers/utils/helper'
import userEvent from '@testing-library/user-event'
import { Email } from '@styled-icons/material/Email'

describe('<Textfield />', () => {
  test('Should render with label', () => {
    renderWithTheme(<Textfield label='textField label' labelFor='text-field' />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText(/textField label/i)).toBeInTheDocument()
    expect(screen.getByText(/textField label/i)).toHaveAttribute('for', 'text-field')
  })

  test('Should render without label', () => {
    renderWithTheme(<Textfield />)
    expect(screen.queryByText(/textField label/i)).not.toBeInTheDocument()
  })

  test('Should render with black label', () => {
    renderWithTheme(<Textfield label='textField label' labelFor='text-field' />)

    expect(screen.getByText(/textField label/i)).toHaveStyle({
      color: '#030517'
    })
  })

  test('Should render with white label', () => {
    renderWithTheme(<Textfield label='textField label' labelFor='text-field' labelColor='white' />)

    expect(screen.getByText(/textField label/i)).toHaveStyle({
      color: '#ffffff'
    })
  })

  test('should render with placeholder', () => {
    renderWithTheme(<Textfield placeholder='hey you' />)

    expect(screen.queryByPlaceholderText('hey you')).toBeInTheDocument()
  })

  test('should render with icon', () => {
    renderWithTheme(<Textfield placeholder='hey you' icon={ <Email data-testid='icon' /> } />)

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  test('should render with icon in the right', () => {
    renderWithTheme(<Textfield placeholder='hey you' iconOnRight icon={ <Email data-testid='icon' /> } />)

    expect(screen.getByTestId('icon').parentElement).toHaveStyle({
      order: 1
    })
  })

  test('should not change its value on type if input is disabled', async () => {
    const onInputChange = jest.fn()
    renderWithTheme(
      <Textfield
        label='textField label'
        labelFor='text-field'
        id='text-field'
        onInputChange={onInputChange}
        disabled
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()

    const text = 'this a text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).not.toHaveValue(text)
    })
    expect(onInputChange).not.toHaveBeenCalled()
  })

  test('should change its value on type', async () => {
    const onInputChange = jest.fn()
    renderWithTheme(<Textfield label='textField label' labelFor='text-field' id='text-field' onInputChange={onInputChange} />)

    const input = screen.getByRole('textbox')
    const text = 'this is new text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(onInputChange).toHaveBeenCalledTimes(text.length)
    })
    expect(onInputChange).toHaveBeenCalledWith(text)
  })

  test('Is accessible by tab', () => {
    renderWithTheme(<Textfield label='textField label' labelFor='text-field' id='text-field' />)
    const input = screen.getByRole('textbox')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).toHaveFocus()
  })

  test('Is not accessible by tab when disabled', () => {
    renderWithTheme(
      <Textfield
        label='textField label'
        labelFor='text-field'
        id='text-field'
        disabled
      />
    )
    const input = screen.getByRole('textbox')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).not.toHaveFocus()
  })

  test('should render error', () => {
    renderWithTheme(
      <Textfield
        label='textField label'
        labelFor='text-field'
        id='text-field'
        disabled
        error='Error message'
      />
    )
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })
})
