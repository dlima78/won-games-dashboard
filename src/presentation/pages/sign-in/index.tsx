import React from 'react'

import Auth from '@/presentation/templates/auth'
import FormSignIn from '@/presentation/components/form-sign-in'
import { Authentication } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols'

type SignInProps = {
  authentication: Authentication
  validation: Validation
}

const SignIn: React.FC<SignInProps> = ({ authentication, validation }: SignInProps) => {
  return (
    <Auth title='Sign-in'>
      <FormSignIn validation={ validation } authentication={authentication} />
    </Auth>
  )
}

export default SignIn
