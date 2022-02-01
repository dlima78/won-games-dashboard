import styled, { css } from 'styled-components'

export const Wrapper = styled.div``

export const Label = styled.label``

export const SelectField = styled.select`
  ${({ theme }) => css`
    width: 100%;
    height: 4rem;
    padding: .8rem ${theme.spacings.xsmall};
    border-radius: ${theme.border.radius} ;
    border-color: ${theme.colors.lightGray} ;
    font-size: ${theme.font.sizes.medium};
    line-height: 1.6;
    outline-color: ${theme.colors.gray};
  `}
`

export const Option = styled.option`
  padding-left: 2rem;
  align-items: center;
`
