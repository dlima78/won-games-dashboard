import React from 'react'
import { Email } from '@styled-icons/material/Email'
import { Lock } from '@styled-icons/material/Lock'
import TextField from '../text-field'
import * as S from './form-sign-in.styled'
import Button from '../button'

const FormSignIn: React.FC = () => {
  return (
    <S.Wrapper>
      <form >
        <TextField type='email' icon={<Email />} placeholder='Email' />
        <TextField type='password' icon={<Lock />} placeholder='Password' />
        <S.ForgotPassword to='/reset-password'>Esqueceu a senha?</S.ForgotPassword>
        <Button size='large' fullWidth>
          Entrar
        </Button>
        <S.FormLink to='/sign-up'>Criar conta</S.FormLink>
      </form>
    </S.Wrapper>
  )
}

export default FormSignIn
