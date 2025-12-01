import type { Company } from '@/types/Company'
import type { Invite } from '@/types/Invite'
import type { Membership } from '@/types/Membership'
import { Role } from '@/types/Role'
import type { User } from '@/types/User'

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
    logo: 'https://images.unsplash.com/photo-1764123108291-0f48d2c7e563',
    createdAt: new Date('2023-12-01')
  },
  company2: {
    id: 'company2',
    name: 'Design Studio',
    logo: 'https://plus.unsplash.com/premium_photo-1664300210895-efce666cf5ab',
    createdAt: new Date('2023-11-15')
  },
  company3: {
    id: 'company3',
    name: 'Marketing Agency',
    logo: 'https://plus.unsplash.com/premium_photo-1752230054438-53a8e7493f55',
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

export const mockInvites: Record<string, Invite> = {
  invite1: {
    id: 'invite1',
    email: 'carlos@example.com',
    companyId: 'company1',
    token: 'token-valid-123456',
    role: Role.MEMBER,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    company: mockCompanies.company1
  },
  invite2: {
    id: 'invite2',
    email: 'ana@example.com',
    companyId: 'company2',
    token: 'token-admin-654321',
    role: Role.ADMIN,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    company: mockCompanies.company2
  }
}

export const mockSession = {
  currentUserId: 'user1',
  activeCompanyId: 'company1'
}
