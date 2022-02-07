import styled, { css } from 'styled-components'
import { desaturate } from 'polished'

export const Wrapper = styled.div``

export const Bar = styled.span`
  ${({ theme }) => css`
    display: block;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    background: ${desaturate(0.7, '#0C15E8')};
    width: 100%;
    height: .5rem;
    position: relative;

    &::before {        
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;      
      width: 30%;
      background: ${theme.colors.primary};
      animation: 'slide' 2s cubic-bezier(0.59, 0.33, 1, 0.71) infinite;

    @keyframes slide {
      0% {
        left: -35%;
        right: 100%;
      }
      60% {
        left: 100%;
        right: -90%;
      }
      100% {
        left: 100%;
        right: -90%;
      }
    }

    }
  `}
`
