import React, { InputHTMLAttributes, useState } from 'react'
import * as S from './text-field.styled'

export type TextFieldProps = {
  onInput?: (value: string) => void
  label?: string
  labelFor?: string
  labelColor?: 'white' | 'black'
  initialValue?: string
  icon?: React.ReactNode
  iconOnRight?: boolean
  disabled?: boolean
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

const TextField: React.FC<TextFieldProps> = ({
  onInput,
  label,
  labelFor = '',
  labelColor = 'black',
  initialValue = '',
  icon,
  iconOnRight = false,
  disabled = false,
  error = '',
  ...props
}: TextFieldProps) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.currentTarget.value
    setValue(newValue)

    !!onInput && onInput(newValue)
  }
  return (
    <S.Wrapper disabled={disabled} error={!!error} >
      {!!label && <S.Label htmlFor={labelFor} labelColor={labelColor} >{label}</S.Label>}
      <S.InputWrapper>
        {!!icon && <S.Icon iconOnRight={iconOnRight} >{icon}</S.Icon> }
        <S.Input type='text' onChange={onChange} value={value} disabled={disabled} {...props} />
      </S.InputWrapper>
        {!!error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.Wrapper>
  )
}

export default TextField
