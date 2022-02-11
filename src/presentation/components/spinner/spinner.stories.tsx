import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Spinner from '.'

export default {
  title: 'Spinner',
  component: Spinner
} as ComponentMeta<typeof Spinner>

export const Basic: ComponentStory<typeof Spinner> = () => <Spinner />
