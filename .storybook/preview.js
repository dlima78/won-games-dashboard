import React from 'react';

import { ThemeProvider } from 'styled-components';
import theme from '../src/presentation/styles/themes'
import GlobalStyles from '../src/presentation/styles/global'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}