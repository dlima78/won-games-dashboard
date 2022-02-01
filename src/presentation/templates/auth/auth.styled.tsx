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
    background-color: ${theme.colors.tertiary};
    align-items: center;
    justify-content: center;
    height: 10rem;    
  `}
`
export const Logo = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.white};
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
    background-color: ${theme.colors.secondary};
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    color: ${theme.colors.white};
    max-width: 30rem;
    padding: ${theme.spacings.small} ${theme.spacings.xsmall} ${theme.spacings.small};
    text-align: center;

    ${media.greaterThan('medium')`
      width: 36rem;
    `}
  `}
`

export const Title = styled.h1``
