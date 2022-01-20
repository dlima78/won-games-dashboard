import React from 'react'
import * as S from './teste.styled'

type Props = {
  title?: string
  description?: string
}

const Teste: React.FC<Props> = ({ title, description }: Props) => {
  return (
    <S.WrapperTeste>
      <S.TesteComponent>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.TesteComponent>
    </S.WrapperTeste>
  )
}

export default Teste
