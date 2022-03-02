import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import FormSignUp from '.'

export default {
  title: 'Form/FormSignUp',
  component: FormSignUp
} as ComponentMeta<typeof FormSignUp>

export const Default: ComponentStory<typeof FormSignUp> = () => (
  <div style={{ width: 300, margin: 'auto' }}>
    <MemoryRouter>
      <FormSignUp />
    </MemoryRouter>
  </div>
)
