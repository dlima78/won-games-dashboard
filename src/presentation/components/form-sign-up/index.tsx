import React, { useState } from 'react'
import { AccountCircle } from '@styled-icons/material/AccountCircle'
import { Email } from '@styled-icons/material/Email'
import { Lock } from '@styled-icons/material/Lock'

import { Validation } from '@/presentation/protocols'
import TextField from '@/presentation/components/text-field'
import Button from '@/presentation/components/button'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import Spinner from '../spinner'
import * as S from '@/presentation/components/form'
import { ErrorOutline } from '@styled-icons/material'
import { useNavigate } from 'react-router-dom'

type FormSignUpProps = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const FormSignUp: React.FC<FormSignUpProps> = ({
  validation,
  addAccount,
  saveAccessToken
}: FormSignUpProps) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  const { name, email, password, passwordConfirmation } = state
  const formData = { name, email, password, passwordConfirmation }

  const handleChange = (field: string, value: string): void => {
    setState((s) => ({ ...s, [field]: value }))
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (event.target.name === 'name') {
      setState((s) => ({ ...s, nameError: validation.validate('name', formData) }))
    }
    if (event.target.name === 'email') {
      setState((s) => ({ ...s, emailError: validation.validate('email', formData) }))
    }

    if (event.target.name === 'password') {
      setState((s) => ({ ...s, passwordError: validation.validate('password', formData) }))
    }

    if (event.target.name === 'passwordConfirmation') {
      setState((s) => ({ ...s, passwordConfirmationError: validation.validate('passwordConfirmation', formData) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setState({ ...state, loading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      await saveAccessToken.save(account.accessToken)
      navigate('/')
    } catch (error) {
      setState({
        ...state,
        mainError: error.message
      })
    }
  }

  const isFormEmpty = !state.email || !state.password || !state.name || !state.passwordConfirmation
  return (
    <S.FormWrapper>
        {state.mainError && <S.FormError data-testid='main-error'>
          <ErrorOutline /> {state.mainError}
        </S.FormError> }
      <form onSubmit={handleSubmit} >
        <TextField
          error={state.nameError}
          type='text'
          icon={<AccountCircle />}
          placeholder='Nome'
          name='name'
          onInputChange={(v) => handleChange('name', v)}
          onInputBlur={handleBlur} />
        <TextField
          error={state.emailError}
          type='email'
          icon={<Email />}
          placeholder='Email'
          name='email'
          onInputChange={(v) => handleChange('email', v)}
          onInputBlur={handleBlur} />
        <TextField
          error={state.passwordError}
          type='password'
          icon={<Lock />}
          placeholder='Senha'
          name='password'
          onInputChange={(v) => handleChange('password', v)}
          onInputBlur={handleBlur} />
        <TextField
          error={state.passwordConfirmationError}
          type='password'
          icon={<Lock />}
          placeholder='Confirme a senha'
          name='passwordConfirmation'
          onInputChange={(v) => handleChange('passwordConfirmation', v)}
          onInputBlur={handleBlur} />
        <Button size='large' type='submit' fullWidth disabled={isFormEmpty}>
            {state.loading ? <Spinner /> : <span>Cadastrar</span>}
        </Button>
        <S.FormLink to='/sign-in'>Já possui conta?</S.FormLink>
      </form>
    </S.FormWrapper>
  )
}

export default FormSignUp
