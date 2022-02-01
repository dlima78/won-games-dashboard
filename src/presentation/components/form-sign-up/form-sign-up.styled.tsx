import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { darken } from 'polished'

import * as TextFieldStyles from '@/presentation/components/text-field/text-field.styled'
import * as ButtonStyles from '@/presentation/components/button/button.styled'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    ${TextFieldStyles.Wrapper} {
      margin: ${theme.spacings.xxsmall} 0;
    }

    ${ButtonStyles.Wrapper} {
      margin: ${theme.spacings.medium} auto ${theme.spacings.xxsmall};
    }

    a {
      border-bottom: 0.1rem solid ${theme.colors.primary};
      color: ${theme.colors.primary};
      font-size: ${theme.font.sizes.xsmall};
      text-decoration: none;
      transition: color, border, ${theme.transition.fast};

      &:hover {
        border-bottom: 0.1rem solid ${darken(0.1, theme.colors.primary)};
        color: ${darken(0.1, theme.colors.primary)};
      }  
    }
  `}
`

export const ForgotPassword = styled(Link)`
  
`
export const FormLink = styled(Link)`
  
`
