import React from 'react'

import SignUp from '@/presentation/pages/sign-up'
import { makeSignUpValidation } from '@/main/factories/validation'
import { makeLocalSaveAccessToken, makeRemoteAddAccount } from '@/main/factories/usecases'

export const MakeSigUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
