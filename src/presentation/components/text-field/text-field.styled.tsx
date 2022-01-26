import styled, { css, DefaultTheme } from 'styled-components'
import { TextFieldProps } from '.'

type WrapperProps = Pick<TextFieldProps, 'labelColor' | 'iconOnRight' | 'disabled'> & { error?: boolean }

const wrapperModifiers = {
  iconOnRight: () => css`
    order: 1;
    margin-left: .5rem;
  `,
  disabled: (theme: DefaultTheme) => css`
    ${Label},
    ${Input},
    ${Icon} {
      cursor: not-allowed;
      color: ${theme.colors.gray};

      &::placeholder {
        color: currentColor;
      }
    }
  `,
  error: (theme: DefaultTheme) => css`
    ${Label},
    ${Icon} {
      color: ${theme.colors.red};
    };
    ${InputWrapper} {
      border: 2px solid ${theme.colors.red};
    };
  `
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, disabled, error }) => css`
    ${disabled && wrapperModifiers.disabled(theme)}
    ${error && wrapperModifiers.error(theme)}
  `}
`

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${theme.spacings.xsmall};
    background: ${theme.colors.lightGray};
    border: 0.2rem solid; 
    border-radius: 0.2rem;
    border-color: ${theme.colors.lightGray};    

    

    &:focus-within {
      box-shadow: 0 0 0.5rem ${theme.colors.primary};
    }
  `}  
`

export const Input = styled.input`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} 0;
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;
  `}
`

export const Label = styled.label<WrapperProps>`
  ${({ theme, labelColor }) => css`
    font-size: ${theme.font.sizes.small};
    color:  ${theme.colors[labelColor]};
    cursor: pointer;
  `}
`

export const Icon = styled.div<WrapperProps>`
  ${({ theme, iconOnRight }) => css`
    display: flex;
    width: 2rem;
    color: ${theme.colors.gray};
    margin-right: .5rem;

    ${!!iconOnRight && wrapperModifiers.iconOnRight}

    & > svg {
      width: 100%;
    }
  `}
`

export const ErrorMessage = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.xsmall};
  `}
`
