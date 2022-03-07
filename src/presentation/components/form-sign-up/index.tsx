import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    setState((s) => ({ ...s, nameError: validation.validate('name', formData) }))
  }, [state.name])

  useEffect(() => {
    setState((s) => ({ ...s, emailError: validation.validate('email', formData) }))
  }, [state.email])

  useEffect(() => {
    setState((s) => ({ ...s, passwordError: validation.validate('password', formData) }))
  }, [state.password])

  useEffect(() => {
    setState((s) => ({ ...s, passwordConfirmationError: validation.validate('passwordConfirmation', formData) }))
  }, [state.passwordConfirmation])

  const handleChange = (field: string, value: string): void => {
    setState((s) => ({ ...s, [field]: value }))
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
          onInputChange={(v) => handleChange('name', v)}
        />
        <TextField
          error={state.emailError}
          type='email'
          icon={<Email />}
          placeholder='Email'
          onInputChange={(v) => handleChange('email', v)} />
        <TextField
          error={state.passwordError}
          type='password'
          icon={<Lock />}
          placeholder='Senha'
          onInputChange={(v) => handleChange('password', v)} />
        <TextField
          error={state.passwordConfirmationError}
          type='password'
          icon={<Lock />}
          placeholder='Confirme a senha'
          onInputChange={(v) => handleChange('passwordConfirmation', v)} />
        <Button size='large' type='submit' fullWidth>
            {state.loading ? <Spinner /> : <span>Cadastrar</span>}
        </Button>
        <S.FormLink to='/sign-in'>Já possui conta?</S.FormLink>
      </form>
    </S.FormWrapper>
  )
}

export default FormSignUp
