import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Login from '@/presentation/pages/login/login'
import GlobalStyles from '@/presentation/styles/global'
import theme from '@/presentation/styles/themes'
import { ThemeProvider } from 'styled-components'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme} >
        <GlobalStyles />
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Router
