'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { useAuth } from '@/hooks/useAuth'

import { SignInForm } from './_components/SignInForm'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading } = useAuth()

  const redirect = searchParams.get('redirect')

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (redirect) {
        router.push(redirect)
      } else {
        router.push('/dashboard')
      }
    }
  }, [isAuthenticated, isLoading, router, redirect])

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
    <AuthLayout description="Acesse sua conta Altaa" title="Bem-vindo de volta">
      <SignInForm redirect={redirect} />
    </AuthLayout>
  )
}
