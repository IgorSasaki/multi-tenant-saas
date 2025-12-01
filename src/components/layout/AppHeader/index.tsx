'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useCompanies } from '@/hooks/useCompanies'

export function AppHeader() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { activeCompanyId, companies } = useCompanies()

  const activeCompany = companies.find(c => c.id === activeCompanyId)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleViewCompanyMembers = () => {
    if (activeCompanyId) {
      router.push(`/empresa/${activeCompanyId}`)
    }
  }

  return (
    <header className="border-border bg-card border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
        >
          <Link href="/dashboard">
            <h1 className="text-foreground cursor-pointer text-lg font-bold transition-opacity hover:opacity-80">
              Altaa
            </h1>
          </Link>
          {activeCompany && (
            <>
              <div className="text-muted-foreground text-sm">
                {activeCompany.name}
              </div>
              <Button
                onClick={handleViewCompanyMembers}
                size="sm"
                variant="outline"
              >
                Membros
              </Button>
            </>
          )}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
        >
          {user && (
            <>
              <span className="text-muted-foreground text-sm">{user.name}</span>
              <Button onClick={handleLogout} size="sm" variant="outline">
                Sair
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </header>
  )
}
