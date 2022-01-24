import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '.'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string'
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      }
    },
    fullWidth: {
      control: {
        type: 'boolean'
      }
    }
  }
} as ComponentMeta<typeof Button>

export const Default: ComponentStory<typeof Button> = (args) => <Button {...args} />

Default.args = {
  children: 'Botão'
}

export const asLink: ComponentStory<typeof Button> = (args) => <Button {...args} />

asLink.args = {
  size: 'large',
  children: 'Link Button',
  as: 'a',
  href: '/link'
}
