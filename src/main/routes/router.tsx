import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import GlobalStyles from '@/presentation/styles/global'
import light from '@/presentation/styles/light'
import { ThemeProvider } from 'styled-components'
import { MakeSigIn, MakeSigUp } from '@/main/factories/pages/'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={light} >
        <GlobalStyles />
          <Routes>
            <Route path='/sign-in' element={<MakeSigIn />} />
            <Route path='/sign-up' element={<MakeSigUp />} />
          </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Router
