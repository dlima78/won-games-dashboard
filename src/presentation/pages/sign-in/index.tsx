import React from 'react'

import Auth from '@/presentation/templates/auth'
import FormSignIn from '@/presentation/components/form-sign-in'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols'

type SignInProps = {
  authentication: Authentication
  validation: Validation
  saveAccessToken: SaveAccessToken
}

const SignIn: React.FC<SignInProps> = ({ authentication, validation, saveAccessToken }: SignInProps) => {
  return (
    <Auth title='Sign-in'>
      <FormSignIn
        validation={ validation }
        authentication={authentication}
        saveAccessToken={saveAccessToken} />
    </Auth>
  )
}

export default SignIn
