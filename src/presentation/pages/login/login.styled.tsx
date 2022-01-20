import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    height: 100vh;
`

export const LoginWrapper = styled.div`
  width: 100%; 
  border: 1px solid red;
`

export const Header = styled.header`
 border: 1px solid green;
`
export const HeaderBar = styled.div`
  ${({ theme }) => css`
    height: 10rem;
    background-color: ${theme.colors.lightGray};    
  `}
`
