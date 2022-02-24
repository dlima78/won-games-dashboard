import { RemoteAuthentication } from '@/data/usecases/authentication'
import { AxiosHttpClient } from '@/infra/http'
import { ValidationBuilder } from '@/main/builders'
import { ValidationComposite } from '@/main/composite'
import SignIn from '@/presentation/pages/sign-in'
import React from 'react'

export const MakeSigIn: React.FC = () => {
  const url = 'http://localhost:5050/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
  return (
    <SignIn
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
