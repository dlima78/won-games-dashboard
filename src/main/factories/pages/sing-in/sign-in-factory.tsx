import React from 'react'
import SignIn from '@/presentation/pages/sign-in'
import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from './sign-in-validation-factory'

export const MakeSigIn: React.FC = () => {
  return (
    <SignIn
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
