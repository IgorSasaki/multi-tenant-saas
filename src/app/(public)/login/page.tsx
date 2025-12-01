'use client'

import { NextPage } from 'next'

import { AuthLayout } from '@/components/layout/AuthLayout'

import { LoginForm } from './_components/SignInForm'

const LoginPage: NextPage = () => {
  return (
    <AuthLayout description="Acesse sua conta Altaa" title="Bem-vindo de volta">
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
