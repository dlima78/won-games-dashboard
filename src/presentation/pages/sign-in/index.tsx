import React from 'react'

import Auth from '@/presentation/templates/auth'
import FormSignIn from '@/presentation/components/form-sign-in'

const SignIn: React.FC = () => {
  return (
    <Auth title='Sign-in'>
      <FormSignIn validation={undefined} />
    </Auth>
  )
}

export default SignIn
