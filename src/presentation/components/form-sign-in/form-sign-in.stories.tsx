import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FormSignIn from '.'

export default {
  title: 'Form/FormSignin',
  component: FormSignIn
} as ComponentMeta<typeof FormSignIn>

export const Default: ComponentStory<typeof FormSignIn> = () => (
  <div style={{ width: 300, margin: 'auto' }}>
    <FormSignIn validation={null} authentication={null} />
  </div>
)
