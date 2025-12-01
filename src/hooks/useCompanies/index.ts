'use client'

import { useContext } from 'react'

import { TenantContext } from '@/contexts/TenantContext'

export const useCompanies = () => {
  const context = useContext(TenantContext)

  if (context === undefined) {
    throw new Error('useCompanies must be used within a TenantProvider')
  }

  return context
}
