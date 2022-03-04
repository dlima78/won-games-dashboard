import React, { useEffect, useState } from 'react'
import { AccountCircle } from '@styled-icons/material/AccountCircle'
import { Email } from '@styled-icons/material/Email'
import { Lock } from '@styled-icons/material/Lock'

import TextField from '@/presentation/components/text-field'
import { Validation } from '@/presentation/protocols'
import Button from '@/presentation/components/button'
import * as S from '@/presentation/components/form'

type FormSignUpProps = {
  validation: Validation
}

const FormSignUp: React.FC<FormSignUpProps> = ({ validation }: FormSignUpProps) => {
  const [state, setState] = useState({
    loading: false,
    name: '',
    email: '',
    password: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState((s) => ({ ...s, nameError: validation.validate('name', state.name) }))
  }, [state.name])

  const handleChange = (field: string, value: string): void => {
    setState((s) => ({ ...s, [field]: value }))
  }
  return (
    <S.FormWrapper>
      <form >
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
        <Button size='large' fullWidth>
          Cadastrar
        </Button>
        <S.FormLink to='/sign-in'>Já possui conta?</S.FormLink>
      </form>
    </S.FormWrapper>
  )
}

export default FormSignUp
