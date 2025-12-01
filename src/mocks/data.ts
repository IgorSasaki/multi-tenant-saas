import { Company } from '@/types/Company'
import { Membership } from '@/types/Membership'
import { Role } from '@/types/Role'
import { User } from '@/types/User'

export const mockUsers: Record<string, User> = {
  user1: {
    id: 'user1',
    name: 'João Silva',
    email: 'joao@example.com',
    activeCompanyId: 'company1',
    createdAt: new Date('2024-01-01')
  },
  user2: {
    id: 'user2',
    name: 'Maria Santos',
    email: 'maria@example.com',
    activeCompanyId: 'company1',
    createdAt: new Date('2024-01-05')
  },
  user3: {
    id: 'user3',
    name: 'Pedro Oliveira',
    email: 'pedro@example.com',
    activeCompanyId: 'company2',
    createdAt: new Date('2024-01-10')
  }
}

export const mockCompanies: Record<string, Company> = {
  company1: {
    id: 'company1',
    name: 'Tech Solutions',
    logo: '/tech-company-logo.jpg',
    createdAt: new Date('2023-12-01')
  },
  company2: {
    id: 'company2',
    name: 'Design Studio',
    logo: '/design-studio-logo.png',
    createdAt: new Date('2023-11-15')
  },
  company3: {
    id: 'company3',
    name: 'Marketing Agency',
    logo: '/marketing-agency-logo.png',
    createdAt: new Date('2023-10-20')
  }
}

export const mockMemberships: Record<string, Membership> = {
  membership1: {
    id: 'membership1',
    userId: 'user1',
    companyId: 'company1',
    role: Role.OWNER,
    createdAt: new Date('2023-12-01')
  },
  membership2: {
    id: 'membership2',
    userId: 'user2',
    companyId: 'company1',
    role: Role.ADMIN,
    createdAt: new Date('2024-01-05')
  },
  membership3: {
    id: 'membership3',
    userId: 'user3',
    companyId: 'company2',
    role: Role.OWNER,
    createdAt: new Date('2023-11-15')
  }
}
