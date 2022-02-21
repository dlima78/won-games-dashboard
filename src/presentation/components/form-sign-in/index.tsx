import React, { useEffect, useState } from 'react'
import { Lock, ErrorOutline } from '@styled-icons/material'
import { Authentication } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols'
import { Email } from '@styled-icons/material/Email'
import TextField from '@/presentation/components/text-field'
import Button from '@/presentation/components/button'
import Spinner from '../spinner'

import * as S from '@/presentation/components/form'

type FormSignInProps = {
  validation: Validation
  authentication: Authentication
}

const FormSignIn: React.FC<FormSignInProps> = ({ validation, authentication }: FormSignInProps) => {
  const [state, setState] = useState({
    loading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    setState((s) => ({ ...s, emailError: validation.validate('email', state.email) }))
    if (state.emailError) {
      setState((s) => ({ ...s, isDisabled: true }))
    }
  }, [state.email])
  useEffect(() => {
    setState((s) => ({ ...s, passwordError: validation.validate('password', state.password) }))
  }, [state.password])

  const handleChange = (field: string, value: string): void => {
    setState((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setState({ ...state, loading: true })
    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  return (
      <S.FormWrapper>
        <S.FormError>
          <ErrorOutline /> Formulário inválido
        </S.FormError>
        <form onSubmit={handleSubmit} >
          <TextField
            error={state.emailError}
            type='email'
            icon={<Email />}
            placeholder='Email'
            onInputChange={(v) => handleChange('email', v)}
          />
          <TextField
            error={state.passwordError}
            type='password'
            icon={<Lock />}
            placeholder='Password'
            onInputChange={(v) => handleChange('password', v)}
          />
          <S.ForgotPassword to='/reset-password'>Esqueceu a senha?</S.ForgotPassword>
          <Button size='large' type='submit' fullWidth >
          {state.loading ? <Spinner /> : <span>Entrar</span>}
          </Button>
          <S.FormLink to='/sign-up'>Criar conta</S.FormLink>
        </form>
      </S.FormWrapper>
  )
}

export default FormSignIn
