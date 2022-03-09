import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, ErrorOutline } from '@styled-icons/material'

import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols'
import { Email } from '@styled-icons/material/Email'
import TextField from '@/presentation/components/text-field'
import Button from '@/presentation/components/button'
import Spinner from '@/presentation/components/spinner'

import * as S from '@/presentation/components/form'

export type FormSignInProps = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const FormSignIn: React.FC<FormSignInProps> = ({
  validation,
  authentication,
  saveAccessToken
}: FormSignInProps) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  const handleChange = (field: string, value: string): void => {
    setState((s) => ({ ...s, [field]: value }))
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (event.target.name === 'email') {
      setState((s) => ({ ...s, emailError: validation.validate('email', { email: state.email }) }))
    }

    if (event.target.name === 'password') {
      setState((s) => ({ ...s, passwordError: validation.validate('password', { password: state.password }) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      if (state.loading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, loading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
      navigate('/')
    } catch (error) {
      setState({
        ...state,
        loading: false,
        mainError: error.message
      })
    }
  }

  const isFormEmpty = !state.email || !state.password

  return (
      <S.FormWrapper >
        {state.mainError && <S.FormError data-testid='main-error'>
          <ErrorOutline /> {state.mainError}
        </S.FormError> }
        <form onSubmit={handleSubmit} >
          <TextField
            error={state.emailError}
            name='email'
            type='email'
            icon={<Email />}
            placeholder='Email'
            onInputChange={(v) => handleChange('email', v)}
            onInputBlur={handleBlur}
          />
          <TextField
            error={state.passwordError}
            name='password'
            type='password'
            icon={<Lock />}
            placeholder='Senha'
            onInputChange={(v) => handleChange('password', v)}
            onInputBlur={handleBlur}
          />
          <S.ForgotPassword to='/reset-password'>Esqueceu a senha?</S.ForgotPassword>
          <Button size='large' type='submit' fullWidth disabled={isFormEmpty} >
          {state.loading ? <Spinner /> : <span>Entrar</span>}
          </Button>
          <S.FormLink to='/sign-up'>Criar conta</S.FormLink>
        </form>
      </S.FormWrapper>
  )
}

export default FormSignIn
