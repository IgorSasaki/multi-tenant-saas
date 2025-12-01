import { Company } from '@/types/Company'
import { Role } from '@/types/Role'

export interface CompanyCardProps {
  company: Company
  isActive?: boolean
  onSelect?: () => void
  userRole: Role
}
