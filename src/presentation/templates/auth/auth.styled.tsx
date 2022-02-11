import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  ${({ theme }) => css`    
    width: 100%;
    height: 100vh;
  `}
`

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10rem;    
  `}
`
export const Logo = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${theme.font.sizes.xlarge};
  `}
`

export const Main = styled.main`  
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  ${({ theme }) => css`
    background-color: #fff;
    border-radius: 1px;
    border: 1px solid ${theme.colors.lightGray};
    color: ${theme.colors.primary};
    max-width: 30rem;
    padding: ${theme.spacings.small} ${theme.spacings.xsmall} ${theme.spacings.small};
    text-align: center;

    ${media.greaterThan('medium')`
      width: 36rem;
    `}
  `}
`

export const Title = styled.h1``
