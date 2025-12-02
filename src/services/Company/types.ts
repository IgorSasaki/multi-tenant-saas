import { Company } from '@/types/Company'
import { Role } from '@/types/Role'

export type CompanyWithRole = Company & {
  userRole: Role
}

export type PaginatedCompanies = {
  companies: CompanyWithRole[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type CompanyDetailsResponse = {
  id: string
  name: string
  logo: string | null
  createdAt: string
  updatedAt: string
  memberships: Array<{
    id: string
    role: Role
    userId: string
    user: {
      id: string
      name: string
      email: string
    }
  }>
}
