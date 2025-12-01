import { Company } from '@/types/Company'
import { Role } from '@/types/Role'

export interface CompanyListProps {
  activeCompanyId: string | null
  companies: Company[]
  isLoading?: boolean
  onSelectCompany: (companyId: string) => void
  userRoles: Record<string, Role>
}
