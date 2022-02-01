import styled, { css, DefaultTheme } from 'styled-components'
import { ButtonProps } from '.'
import { darken } from 'polished'

type WrapperProps = Pick<ButtonProps, 'size' | 'fullWidth'>

const wrapperModifiers = {
  small: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes.xsmall};
  `,
  medium: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.small};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.small};
  `,
  large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
  `,
  fullWidth: () => css`
    width: 100%;
  `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, fullWidth }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    cursor: pointer;
    border: 0;
    border-radius: ${theme.border.radiusButton};
    padding: ${theme.spacings.xxsmall};
    text-decoration: none;
    transition: color, ${theme.transition.default};

    &:hover {
      background-color: ${darken(0.1, theme.colors.primary)};
    }

    ${!!size && wrapperModifiers[size](theme)}
    ${fullWidth && wrapperModifiers.fullWidth}
  `}
`
