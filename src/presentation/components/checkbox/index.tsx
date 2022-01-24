import React, { InputHTMLAttributes, useState } from 'react'
import * as S from './checkbox.styled'

export type CheckboxProps = {
  onCheck?: (status: boolean) => void
  isChecked?: boolean
  label?: string
  labelFor?: string
  labelColor?: 'white' | 'black'
  value?: string | readonly string[] | number | undefined
} & InputHTMLAttributes<HTMLInputElement>

const Checkbox: React.FC<CheckboxProps> = ({
  onCheck,
  isChecked = false,
  label,
  labelFor = '',
  labelColor = 'black',
  value,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(isChecked)

  const onChange = (): void => {
    const status = !checked
    setChecked(status)

    if (onCheck) {
      onCheck(status)
    }
  }
  return (
    <S.Wrapper>
      <S.Input
        type="checkbox"
        id={labelFor}
        onChange={onChange}
        checked={checked}
        value={value}
        {...props}
        />
      {!!label && <S.Label htmlFor={labelFor} labelColor={labelColor} >{ label }</S.Label>}
    </S.Wrapper>
  )
}

export default Checkbox
