import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import LoadingBar from '.'

export default {
  title: 'LoadingBar',
  component: LoadingBar
} as ComponentMeta<typeof LoadingBar>

export const Basic: ComponentStory<typeof LoadingBar> = () => <LoadingBar />
