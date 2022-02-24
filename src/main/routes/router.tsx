import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import SignUp from '@/presentation/pages/sign-up'
import GlobalStyles from '@/presentation/styles/global'
import light from '@/presentation/styles/light'
import { ThemeProvider } from 'styled-components'
import { MakeSigIn } from '@/main/factories/pages/sign-in-factory'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={light} >
        <GlobalStyles />
          <Routes>
            <Route path='/sign-in' element={<MakeSigIn />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Router
