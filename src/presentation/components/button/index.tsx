import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import * as S from './button.styled'

type ButtonTypes = AnchorHTMLAttributes<HTMLAnchorElement> |ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  as?: React.ElementType
} & ButtonTypes

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'medium',
  fullWidth = false,
  ...props
}: ButtonProps) => (
    <S.Wrapper size={size} fullWidth={fullWidth} {...props} >
      { !!children && <>{children}</> }
    </S.Wrapper>
)
export default Button
