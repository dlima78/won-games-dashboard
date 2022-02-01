import React from 'react'
import { AccountCircle } from '@styled-icons/material/AccountCircle'
import { Email } from '@styled-icons/material/Email'
import { Lock } from '@styled-icons/material/Lock'
import TextField from '@/presentation/components/text-field'
import Button from '@/presentation/components/button'
import * as S from './form-sign-up.styled'

const FormSignUp: React.FC = () => {
  return (
    <S.Wrapper>
      <form >
        <TextField type='text' icon={<AccountCircle />} placeholder='Nome' />
        <TextField type='email' icon={<Email />} placeholder='Email' />
        <TextField type='password' icon={<Lock />} placeholder='Senha' />
        <TextField type='password' icon={<Lock />} placeholder='Confirme a senha' />
        <Button size='large' fullWidth>
          Cadastrar
        </Button>
        <S.FormLink to='/sign-in'>Já possui conta?</S.FormLink>
      </form>
    </S.Wrapper>
  )
}

export default FormSignUp
