'use client'

import { useRouter } from 'next/navigation'
import type React from 'react'
import { useEffect } from 'react'

import { AppShell } from '@/components/layout/AppShell'
import { useAuth } from '@/hooks/useAuth'
import { useCompanies } from '@/hooks/useCompanies'

export default function ProtectedLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const { loadCompanies } = useCompanies()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (user && !isLoading) {
      loadCompanies(user.id)
    }
  }, [user, isLoading, loadCompanies])

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-12">
          <div className="border-muted border-t-primary inline-block h-8 w-8 animate-spin rounded-full border-4" />
        </div>
      </AppShell>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <AppShell>{children}</AppShell>
}
