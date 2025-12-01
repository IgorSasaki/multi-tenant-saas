import { Company } from '@/types/Company'
import { Role } from '@/types/Role'

export interface CompanyContextType {
  activeCompanyId: string | null
  companies: Company[]
  createCompany: (name: string, logo?: string, userId?: string) => Promise<void>
  isLoading: boolean
  loadCompanies: (userId: string) => Promise<void>
  selectCompany: (companyId: string) => Promise<void>
  userRole: Role | null
}
