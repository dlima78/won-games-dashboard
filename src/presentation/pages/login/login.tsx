import React from 'react'
import * as S from './login.styled'
import GlobalStyles from '@/presentation/styles/global'
import theme from '@/presentation/styles/themes'
import { ThemeProvider } from 'styled-components'

const Login: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <S.LoginWrapper>Ola</S.LoginWrapper>
    </ThemeProvider>
  )
}

export default Login
