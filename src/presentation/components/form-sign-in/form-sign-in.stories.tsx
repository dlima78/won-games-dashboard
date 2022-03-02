import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import FormSignIn from '.'

export default {
  title: 'Form/FormSignin',
  component: FormSignIn
} as ComponentMeta<typeof FormSignIn>

export const Default: ComponentStory<typeof FormSignIn> = (args) => (
  <div style={{ width: 300, margin: 'auto' }}>
    <MemoryRouter>
      <FormSignIn {...args} />
    </MemoryRouter>
  </div>
)
