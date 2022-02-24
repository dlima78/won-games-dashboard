import React from 'react'
import SignIn from '@/presentation/pages/sign-in'
import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { makeSignInValidation } from '../../validation'

export const MakeSigIn: React.FC = () => {
  return (
    <SignIn
      authentication={makeRemoteAuthentication()}
      validation={makeSignInValidation()}
    />
  )
}
