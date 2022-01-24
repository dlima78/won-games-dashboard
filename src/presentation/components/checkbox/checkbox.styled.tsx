import styled, { css } from 'styled-components'
import { CheckboxProps } from '.'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Input = styled.input`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    cursor: pointer;
    border: 0.2rem solid ${theme.colors.gray};
    border-radius: 0.2rem;
    transition: background border ${theme.transition.fast};
    width: 1.8rem;
    height: 1.8rem;
    position: relative;
    outline: none;
    

    &::before {
      content: '';
      width: 0.6rem;
      height: 0.9rem;
      border: 0.2rem solid ${theme.colors.lightGray};
      border-top: 0;
      border-left: 0;
      position: absolute;
      transform: rotate(45deg);
      top: 0.1rem;
      opacity: 0;
      transition: ${theme.transition.fast};
    }

    &:focus {
      box-shadow: 0 0 0.5rem ${theme.colors.primary};
    }

    &:checked {
      border-color: ${theme.colors.primary};
      background: ${theme.colors.primary};

      &::before {
        opacity: 1;
      }
    }

    
  `}

`

export const Label = styled.label<Pick<CheckboxProps, 'labelColor'>>`
  ${({ theme, labelColor }) => css`
    cursor: pointer;
    color: ${theme.colors[labelColor]};
    padding-left: ${theme.spacings.xxsmall};
    line-height: 1;
  `}
`
