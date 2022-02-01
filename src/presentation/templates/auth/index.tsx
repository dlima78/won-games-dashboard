import React from 'react'
import * as S from './auth.styled'

export type AuthProps = {
  title: string
  children: React.ReactNode
}

const Auth: React.FC<AuthProps> = ({ title, children }: AuthProps) => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.Logo>ADMIN</S.Logo>
      </S.Header>
      <S.Main>
        <S.Content>
        <S.Title>{title} </S.Title>
        {children}
        </S.Content>
      </S.Main>
    </S.Wrapper>
  )
}

export default Auth
