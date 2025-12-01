import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type React from 'react'

import '@/styles/globals.css'
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
        {children}
      </body>
    </html>
  )
}

export default RootLayout
