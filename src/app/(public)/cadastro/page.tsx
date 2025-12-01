'use client'

import { NextPage } from 'next'

import { AuthLayout } from '@/components/layout/AuthLayout'

import { SignUpForm } from './_components/SignUpForm'

const Page: NextPage = () => {
  return (
    <AuthLayout
      description="Comece a gerenciar suas empresas"
      title="Criar sua conta"
    >
      <SignUpForm />
    </AuthLayout>
  )
}

export default Page
