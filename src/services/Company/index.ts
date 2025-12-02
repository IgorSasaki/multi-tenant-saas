import { apiFetch } from '@/lib/api'
import type { Company, CompanyCreateInput } from '@/types/Company'
import type { Role } from '@/types/Role'

import { PaginatedCompanies, CompanyDetailsResponse } from './types'

export const companyService = {
  async listCompaniesByUser(): Promise<Company[]> {
    const { companies } = await apiFetch<PaginatedCompanies>(
      '/companies?page=1&pageSize=100'
    )

    return companies.map(c => ({
      id: c.id,
      name: c.name,
      logo: c.logo,
      createdAt: new Date(c.createdAt)
    }))
  },

  async createCompany(data: CompanyCreateInput): Promise<Company> {
    const company = await apiFetch<Company>('/company', {
      method: 'POST',
      body: {
        name: data.name,
        logoUrl: data.logo || null
      }
    })

    return {
      ...company,
      createdAt: new Date(company.createdAt)
    }
  },

  async selectCompany(companyId: string): Promise<void> {
    await apiFetch<void>(`/company/${companyId}/select`, {
      method: 'POST'
    })
  },

  async getCompanyWithUserRole(
    companyId: string,
    userId: string
  ): Promise<{ company: Company; role: Role } | null> {
    try {
      const response = await apiFetch<CompanyDetailsResponse>(
        `/company/${companyId}`
      )

      const userMembership = response.memberships.find(m => m.userId === userId)

      if (!userMembership) {
        return null
      }

      const company: Company = {
        id: response.id,
        name: response.name,
        logo: response.logo,
        createdAt: new Date(response.createdAt)
      }

      return {
        company,
        role: userMembership.role
      }
    } catch {
      return null
    }
  }
}
