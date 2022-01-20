import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import MediaMatch from '.'

export default {
  title: 'MediaMatch',
  component: MediaMatch
} as ComponentMeta<typeof MediaMatch>

export const Desktop: ComponentStory<typeof MediaMatch> = () => <MediaMatch greaterThan='medium' >Only on Desktop</MediaMatch>
export const Mobile: ComponentStory<typeof MediaMatch> = () => <MediaMatch lessThan='medium' >Only on Mobile</MediaMatch>

Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
}
