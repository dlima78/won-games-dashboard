import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Checkbox from '.'

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      type: 'string'
    },
    labelFor: {
      type: 'string'
    },
    labelColor: {
      control: {
        type: 'select',
        options: ['black', 'white']
      }
    },
    onCheck: {
      action: 'checked'
    }
  }
} as ComponentMeta<typeof Checkbox>

export const Default: ComponentStory<typeof Checkbox> = (args) => (
  <>
    <div style={{ padding: 10 }} >
      <Checkbox
        name='category'
        label='Action'
        labelFor='action'
        isChecked
        {...args}
      />
    </div>
    <div style={{ padding: 10 }} >
      <Checkbox
        name='category'
        label='Adventure'
        labelFor='adventure'
        {...args}
      />
    </div>
    <div style={{ padding: 10 }} >
      <Checkbox
        name='category'
        label='Strategy'
        labelFor='strategy'
        {...args}
      />
    </div>
  </>
)
