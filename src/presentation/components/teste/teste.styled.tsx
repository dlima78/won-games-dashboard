import styled, { css } from 'styled-components'

export const WrapperTeste = styled.div`
  height: 100vh;  
`

export const TesteComponent = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.lightGray};
  `}
`

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.lightBg};
    text-align: center;
    font-size: ${theme.font.sizes.xxlarge};
  `}
`
export const Description = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.lightBg};
    text-align: center;
  `}
`
