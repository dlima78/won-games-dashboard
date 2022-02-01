import React from 'react'

import Auth from '@/presentation/templates/auth'
import FormSignUp from '@/presentation/components/form-sign-up'

const SignUp: React.FC = () => {
  return (
    <Auth title='Sign-up'>
      <FormSignUp />
    </Auth>
  )
}

export default SignUp
