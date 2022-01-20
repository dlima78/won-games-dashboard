import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Teste from '@/presentation/components/teste'

export default {
  title: 'Example/Teste',
  component: Teste,
  args: {
    title: 'Default',
    description: 'Deffofuouu'
  }
} as ComponentMeta<typeof Teste>

export const Template: ComponentStory<typeof Teste> = (args) => <Teste {...args} />
