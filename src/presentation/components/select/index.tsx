import React from 'react'
import * as S from './select.styled'

const Select: React.FC = () => {
  return (
    <S.Wrapper>
      <S.Label>Label</S.Label>
      <S.SelectField name='select' id='select' >
        <S.Option value='value 1'>1</S.Option>
        <S.Option value='value 2'>2</S.Option>
        <S.Option value='value 3'>3</S.Option>
      </S.SelectField>
    </S.Wrapper>
  )
}

export default Select
