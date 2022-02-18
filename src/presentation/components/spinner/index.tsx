import React from 'react'
import * as S from './spinner.styled'

const Spinner: React.FC = () => {
  return (
    <S.Wrapper data-testid='spinner' >
      <S.LoadingDot />
      <S.LoadingDot />
      <S.LoadingDot />
    </S.Wrapper>
  )
}

export default Spinner
