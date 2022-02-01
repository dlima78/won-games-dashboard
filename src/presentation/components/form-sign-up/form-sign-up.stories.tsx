import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FormSignUp from '.'

export default {
  title: 'Form/FormSignUp',
  component: FormSignUp
} as ComponentMeta<typeof FormSignUp>

export const Default: ComponentStory<typeof FormSignUp> = () => (
  <div style={{ width: 300, margin: 'auto' }}>
    <FormSignUp />
  </div>
)
