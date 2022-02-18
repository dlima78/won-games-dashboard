import styled, { css } from 'styled-components'
import { darken } from 'polished'

export const LoadingDot = styled.div``

export const Wrapper = styled.div`
  ${LoadingDot} {
    ${({ theme }) => css`
      border-radius: 50%;
      background-color:  ${darken(0.2, theme.colors.primary)};
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      animation: pulse 1.5s infinite ease-in-out;
  
      @keyframes pulse {
        0%, 80%, 100% {
          transform: scale(0)
        }
        40% {
          transform: scale(1)
        }
      }
    `}
    &:nth-child(1) {
      animation-delay: -0.30s;
    }
    &:nth-child(2) {
      animation-delay: -0.15s;
    }
  }

`
