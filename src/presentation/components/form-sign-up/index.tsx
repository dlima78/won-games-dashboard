import React, { useEffect, useState } from 'react'
import { AccountCircle } from '@styled-icons/material/AccountCircle'
import { Email } from '@styled-icons/material/Email'
import { Lock } from '@styled-icons/material/Lock'

import { Validation } from '@/presentation/protocols'
import TextField from '@/presentation/components/text-field'
import Button from '@/presentation/components/button'
import { AddAccount } from '@/domain/usecases'
import Spinner from '../spinner'
import * as S from '@/presentation/components/form'

type FormSignUpProps = {
  validation: Validation
  addAccount: AddAccount
}

const FormSignUp: React.FC<FormSignUpProps> = ({ validation, addAccount }: FormSignUpProps) => {
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

  useEffect(() => {
    setState((s) => ({ ...s, nameError: validation.validate('name', state.name) }))
  }, [state.name])

  useEffect(() => {
    setState((s) => ({ ...s, emailError: validation.validate('email', state.email) }))
  }, [state.email])

  useEffect(() => {
    setState((s) => ({ ...s, passwordError: validation.validate('password', state.password) }))
  }, [state.password])

  useEffect(() => {
    setState((s) => ({ ...s, passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation) }))
  }, [state.passwordConfirmation])

  const handleChange = (field: string, value: string): void => {
    setState((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setState({ ...state, loading: true })
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
  }
  return (
    <S.FormWrapper>
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
