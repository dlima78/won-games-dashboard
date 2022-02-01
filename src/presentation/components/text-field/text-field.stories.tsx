import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Email } from '@styled-icons/material/Email'

import TextField from '.'

export default {
  title: 'Form/TextField',
  component: TextField,
  args: {
    label: 'E-mail',
    labelFor: 'Email',
    id: 'Email',
    initialValue: '',
    placeholder: 'john.cage@gmail.com'
  },
  argTypes: {
    labelColor: {
      control: {
        type: 'select',
        options: ['white', 'black']
      }
    },
    onInput: { action: 'changed' },
    iconOnRight: {
      type: 'boolean'
    },
    disabled: {
      type: 'boolean'
    },
    error: {
      type: 'string'
    }
  }
} as ComponentMeta<typeof TextField>

export const Default: ComponentStory<typeof TextField> = (args) => (
   <div style={{ maxWidth: 300, padding: 15 }}>
      <TextField {...args} />
    </div>
)

export const withIcon: ComponentStory<typeof TextField> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
     <TextField {...args} />
   </div>
)

withIcon.args = {
  icon: <Email />
}

export const withError: ComponentStory<typeof TextField> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
     <TextField {...args} />
   </div>
)

withError.args = {
  icon: <Email />,
  error: 'this is an error'
}
