import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { lighten } from 'polished'

import * as TextFieldStyles from '@/presentation/components/text-field/text-field.styled'
import * as ButtonStyles from '@/presentation/components/button/button.styled'

export const FormWrapper = styled.div`
  ${({ theme }) => css`
    ${TextFieldStyles.Wrapper} {
      margin: ${theme.spacings.xxsmall} 0;
    }

    ${ButtonStyles.Wrapper} {
      margin: ${theme.spacings.medium} auto ${theme.spacings.xxsmall};
    }

    a {
      border-bottom: 0.1rem solid ${theme.colors.green};
      color: ${theme.colors.green};
      font-size: ${theme.font.sizes.xsmall};
      text-decoration: none;
      transition: color, border, ${theme.transition.fast};

      &:hover {
        border-bottom: 0.1rem solid ${lighten(0.1, theme.colors.green)};
        color: ${lighten(0.1, theme.colors.green)};
      }  
    }
  `}
`

export const ForgotPassword = styled(Link)`
  
`
export const FormLink = styled(Link)`
  
`
