'use client'

import { NextPage } from 'next'
import { PropsWithChildren } from 'react'

import { AppShell } from '@/components/layout/AppShell'

const ProtectedLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return <AppShell>{children}</AppShell>
}

export default ProtectedLayout
