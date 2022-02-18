import React, { useState } from 'react'
import { Email } from '@styled-icons/material/Email'
import { Lock, ErrorOutline } from '@styled-icons/material'
import TextField from '@/presentation/components/text-field'
import Button from '@/presentation/components/button'
import * as S from '@/presentation/components/form'
import Spinner from '../spinner'
import { Validation } from '@/presentation/protocols'

type FormSignInProps = {
  validation: Validation
}

const FormSignIn: React.FC<FormSignInProps> = ({ validation }: FormSignInProps) => {
  const [loading] = useState(false)
  const [value, setValue] = useState({ email: '', password: '' })

  const handleChange = (field: string, value: string): void => {
    setValue((s) => ({ ...s, [field]: value }))
    validation.validate(field, value)
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    console.log(value)
  }

  return (
    <S.FormWrapper>
      <S.FormError>
        <ErrorOutline /> Formulário inválido
      </S.FormError>
      <form onSubmit={handleSubmit} >
        <TextField
          type='email'
          icon={<Email />}
          placeholder='Email'
          onInputChange={(v) => handleChange('email', v)}
        />
        <TextField
          type='password'
          icon={<Lock />}
          placeholder='Password'
          onInputChange={(v) => handleChange('password', v)}
        />
        <S.ForgotPassword to='/reset-password'>Esqueceu a senha?</S.ForgotPassword>
        <Button size='large' type='submit' fullWidth >
         {loading ? <Spinner /> : <span>Entrar</span>}
        </Button>
        <S.FormLink to='/sign-up'>Criar conta</S.FormLink>
      </form>
    </S.FormWrapper>
  )
}

export default FormSignIn
