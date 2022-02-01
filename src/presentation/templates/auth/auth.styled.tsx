import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  ${({ theme }) => css`    
    width: 100%;
    height: 100vh;
  `}
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
`
export const Logo = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    font-size: ${theme.font.sizes.xlarge};
  `}
`

export const Main = styled.main`
  border: 5px solid red;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`
export const Title = styled.h1``

export const Content = styled.div`
  ${({ theme }) => css`
    border: 5px solid blue;
    max-width: 30rem;

    ${media.greaterThan('medium')`
      width: 36rem;
    `}
  `}
`
