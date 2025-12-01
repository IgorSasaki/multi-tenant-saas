import { mockCompanies, mockMemberships, mockUsers } from '@/mocks/data'
import type { Company, CompanyCreateInput } from '@/types/Company'
import { Role } from '@/types/Role'
import { delay } from '@/utils/delay'

export const companyMockService = {
  async listCompaniesByUser(userId: string): Promise<Company[]> {
    await delay(500)

    const userMemberships = Object.values(mockMemberships).filter(
      m => m.userId === userId
    )

    return userMemberships.map(m => mockCompanies[m.companyId]).filter(Boolean)
  },

  async createCompany(
    data: CompanyCreateInput,
    userId: string
  ): Promise<Company> {
    await delay(600)

    const newCompany: Company = {
      id: `company${Date.now()}`,
      name: data.name,
      logo: data.logo || null,
      createdAt: new Date()
    }

    mockCompanies[newCompany.id] = newCompany

    const newMembership = {
      id: `membership${Date.now()}`,
      userId,
      companyId: newCompany.id,
      role: Role.OWNER,
      createdAt: new Date()
    }

    mockMemberships[newMembership.id] = newMembership

    return newCompany
  },

  async selectCompany(userId: string, companyId: string): Promise<void> {
    await delay(300)

    const membership = Object.values(mockMemberships).find(
      m => m.userId === userId && m.companyId === companyId
    )

    if (!membership) {
      throw new Error('User is not a member of this company')
    }

    const user = mockUsers[userId]
    if (user) {
      user.activeCompanyId = companyId
    }
  },

  async getCompanyWithUserRole(
    companyId: string,
    userId: string
  ): Promise<{ company: Company; role: Role } | null> {
    await delay(300)

    const company = mockCompanies[companyId]
    const membership = Object.values(mockMemberships).find(
      m => m.userId === userId && m.companyId === companyId
    )

    if (!company || !membership) {
      return null
    }

    return { company, role: membership.role }
  }
}
