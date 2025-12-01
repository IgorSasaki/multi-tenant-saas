'use client'

import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState
} from 'react'

import { companyMockService } from '@/services/Company/mock'
import type { Company } from '@/types/Company'
import type { Role } from '@/types/Role'

import { CompanyContextType } from './types'

export const TenantContext = createContext<CompanyContextType | undefined>(
  undefined
)

export const TenantProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])
  const [userRole, _setUserRole] = useState<Role | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadCompanies = useCallback(
    async (userId: string) => {
      setIsLoading(true)
      try {
        const userCompanies =
          await companyMockService.listCompaniesByUser(userId)
        setCompanies(userCompanies)

        if (userCompanies.length > 0 && !activeCompanyId) {
          setActiveCompanyId(userCompanies[0].id)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [activeCompanyId]
  )

  const selectCompany = useCallback(
    async (companyId: string, userId?: string) => {
      setIsLoading(true)
      try {
        if (userId) {
          await companyMockService.selectCompany(userId, companyId)
        }
        setActiveCompanyId(companyId)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const createCompany = useCallback(
    async (name: string, logo?: string, userId?: string) => {
      setIsLoading(true)
      try {
        if (userId) {
          const newCompany = await companyMockService.createCompany(
            { name, logo },
            userId
          )
          setCompanies(prev => [...prev, newCompany])
          setActiveCompanyId(newCompany.id)
        }
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return (
    <TenantContext.Provider
      value={{
        activeCompanyId,
        companies,
        userRole,
        selectCompany,
        loadCompanies,
        createCompany,
        isLoading
      }}
    >
      {children}
    </TenantContext.Provider>
  )
}
