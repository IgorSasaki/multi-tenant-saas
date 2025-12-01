'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useCompanies } from '@/hooks/useCompanies'
import { companyMockService } from '@/services/Company/mock'
import { Role } from '@/types/Role'

import { CompanyList } from './_components/CompanyList'
import { CreateCompanyModal } from './_components/CreateCompanyModal'
import type { CompanyFormData } from './_components/CreateCompanyModal/schemas'

export default function DashboardPage() {
  const { user } = useAuth()
  const {
    activeCompanyId,
    companies,
    selectCompany,
    createCompany,
    isLoading
  } = useCompanies()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userRoles, setUserRoles] = useState<Record<string, Role>>({})

  useEffect(() => {
    getUserRoles()
  }, [])

  const getUserRoles = async () => {
    const roles: Record<string, Role> = {}
    for (const company of companies) {
      const result = await companyMockService.getCompanyWithUserRole(
        company.id,
        user?.id || ''
      )
      if (result) {
        roles[company.id] = result.role
      }
    }
    setUserRoles(roles)
  }

  const handleSelectCompany = async (companyId: string) => {
    await selectCompany(companyId)
  }

  const handleCreateCompany = async (data: CompanyFormData) => {
    await createCompany(data.name, data.logo || undefined, user?.id)
    setIsDialogOpen(false)
    await getUserRoles()
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
    >
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              Minhas Empresas
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie suas empresas e equipes
            </p>
          </div>

          <CreateCompanyModal
            isDialogOpen={isDialogOpen}
            isLoading={isLoading}
            onSubmit={handleCreateCompany}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        {companies.length > 0 ? (
          <CompanyList
            activeCompanyId={activeCompanyId}
            companies={companies}
            isLoading={isLoading}
            onSelectCompany={handleSelectCompany}
            userRoles={userRoles}
          />
        ) : (
          <motion.div
            animate={{ opacity: 1 }}
            className="border-border bg-muted/50 rounded-lg border-2 border-dashed p-12 text-center"
            initial={{ opacity: 0 }}
          >
            <p className="text-muted-foreground mb-4">
              Você ainda não tem nenhuma empresa
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Criar Primeira Empresa
            </Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
