'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { useAuth } from '@/hooks/useAuth'

import { SignUpForm } from './_components/SignUpForm'

export default function SignupPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <AuthLayout description="Carregando..." title="Altaa">
        <div className="text-center">
          <div className="border-muted border-t-primary inline-block h-8 w-8 animate-spin rounded-full border-4" />
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      description="Comece a gerenciar suas empresas"
      title="Criar sua conta"
    >
      <SignUpForm />
    </AuthLayout>
  )
}
