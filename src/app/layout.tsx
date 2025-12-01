import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type React from 'react'
import { Toaster } from 'sonner'

import '@/styles/globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { TenantProvider } from '@/contexts/TenantContext'
import { cn } from '@/lib/utils'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Altaa - Gerenciador de Equipes',
  description: 'Gerenciador de Equipes'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          _geist.className,
          _geistMono.className
        )}
      >
        <AuthProvider>
          <TenantProvider>
            {children}

            <Toaster position="top-right" expand richColors />
          </TenantProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
