import React from 'react'

import SignIn from '@/presentation/pages/sign-in'
import { makeRemoteAuthentication, makeLocalSaveAccessToken } from '@/main/factories/usecases'
import { makeSignInValidation } from '@/main/factories/validation'

export const MakeSigIn: React.FC = () => {
  return (
    <SignIn
      authentication={makeRemoteAuthentication()}
      validation={makeSignInValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
