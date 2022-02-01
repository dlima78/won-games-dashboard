import React from 'react'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'
import SignIn from '@/presentation/pages/sign-in'
import SignUp from '@/presentation/pages/sign-up'
import GlobalStyles from '@/presentation/styles/global'
import light from '@/presentation/styles/light'
import { ThemeProvider } from 'styled-components'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={light} >
        <GlobalStyles />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Router
