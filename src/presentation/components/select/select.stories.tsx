import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Select from '.'

export default {
  title: 'Form/Select',
  component: Select
} as ComponentMeta<typeof Select>

export const Basic: ComponentStory<typeof Select> = () => <Select />
