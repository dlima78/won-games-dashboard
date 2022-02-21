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
      border: .1rem solid ${theme.colors.red};
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
    border: .1rem solid; 
    border-radius: 0.2rem;
    border-color: ${theme.colors.lightGray};    

    

    &:focus-within {
      border: 0.1rem solid ${theme.colors.gray};
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

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.xsmall};
  `}
`
