import React from 'react'
import Checkbox from '@/presentation/components/checkbox'
import { renderWithTheme } from '@/utils/helper'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'

describe('<Checkbox />', () => {
  test('Should render with label', () => {
    renderWithTheme(<Checkbox label="checkbox label" labelFor="check" />)

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByLabelText(/checkbox label/i)).toBeInTheDocument()
    expect(screen.getByText(/checkbox label/i)).toHaveAttribute('for', 'check')
  })

  test('Should render without label', () => {
    renderWithTheme(<Checkbox />)
    expect(screen.queryByLabelText(/checkbox label/i)).not.toBeInTheDocument()
  })

  test('Should render with black label', () => {
    renderWithTheme(<Checkbox label='checkbox label' labelFor='check' />)
    expect(screen.getByText(/checkbox label/i)).toHaveStyle({
      color: '#030517'
    })
  })

  test('Should render with white label', () => {
    renderWithTheme(<Checkbox label='checkbox label' labelFor='check' labelColor="white" />)
    expect(screen.getByText(/checkbox label/i)).toHaveStyle({
      color: '#ffffff'
    })
  })

  test('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn()
    renderWithTheme(<Checkbox label='Checkbox' onCheck={onCheck} />)

    expect(onCheck).not.toHaveBeenCalled()
    userEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })
    expect(onCheck).toHaveBeenCalledWith(true)
  })

  test('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn()
    renderWithTheme(<Checkbox label='Checkbox' onCheck={onCheck} isChecked />)

    userEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })
    expect(onCheck).toHaveBeenCalledWith(false)
  })

  test('should be accessible with tab', async () => {
    renderWithTheme(<Checkbox label='Checkbox' labelFor='Checkbox' isChecked />)

    expect(document.body).toHaveFocus()
    userEvent.tab()
    expect(screen.getByLabelText(/checkbox/i)).toHaveFocus()
  })
})
