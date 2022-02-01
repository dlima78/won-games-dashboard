import React from 'react';

import { ThemeProvider } from 'styled-components';
import light from '../src/presentation/styles/light'
import GlobalStyles from '../src/presentation/styles/global'
import { MemoryRouter } from 'react-router'

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <ThemeProvider theme={light}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    </MemoryRouter>
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