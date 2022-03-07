import React from 'react'

import Auth from '@/presentation/templates/auth'
import FormSignUp from '@/presentation/components/form-sign-up'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols'

type SignUpProps = {
  addAccount: AddAccount
  validation: Validation
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<SignUpProps> = ({ addAccount, validation, saveAccessToken }: SignUpProps) => {
  return (
    <Auth title='Sign-up'>
      <FormSignUp
        addAccount={addAccount}
        validation={validation}
        saveAccessToken={saveAccessToken}
      />
    </Auth>
  )
}

export default SignUp
