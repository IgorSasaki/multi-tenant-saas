import {
  mockInvites,
  mockUsers,
  mockCompanies,
  mockMemberships
} from '@/mocks/data'
import type { Invite, InviteInput } from '@/types/Invite'
import type { Membership } from '@/types/Membership'
import { Role } from '@/types/Role'
import type { User } from '@/types/User'
import { delay } from '@/utils/delay'

function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

export const inviteMockService = {
  async createInvite(companyId: string, data: InviteInput): Promise<Invite> {
    await delay(500)

    if (data.role === Role.OWNER) {
      throw new Error(
        'Não é possível criar convite para o papel de PROPRIETÁRIO'
      )
    }

    const existingInvite = Object.values(mockInvites).find(
      i =>
        i.email === data.email &&
        i.companyId === companyId &&
        i.expiresAt > new Date()
    )

    if (existingInvite) {
      return existingInvite
    }

    const newInvite: Invite = {
      id: `invite${Date.now()}`,
      email: data.email,
      companyId,
      token: generateToken(),
      role: data.role,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      company: mockCompanies[companyId]
    }

    mockInvites[newInvite.id] = newInvite
    return newInvite
  },

  async listInvitesByCompany(companyId: string): Promise<Invite[]> {
    await delay(300)

    return Object.values(mockInvites).filter(
      i => i.companyId === companyId && i.expiresAt > new Date()
    )
  },

  async getInviteByToken(
    token: string
  ): Promise<(Invite & { isExpired: boolean }) | null> {
    await delay(300)

    const invite = Object.values(mockInvites).find(i => i.token === token)
    if (!invite) {
      return null
    }

    return {
      ...invite,
      isExpired: invite.expiresAt < new Date()
    }
  },

  async acceptInviteAsExistingUser(
    token: string,
    userId: string
  ): Promise<void> {
    await delay(500)

    const invite = Object.values(mockInvites).find(i => i.token === token)
    if (!invite) {
      throw new Error('Convite inválido ou expirado')
    }

    if (invite.expiresAt < new Date()) {
      throw new Error('Convite expirado')
    }

    const user = mockUsers[userId]
    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    if (user.email !== invite.email) {
      throw new Error('Email não corresponde ao convite')
    }

    delete mockInvites[invite.id]
  },

  async acceptInviteAsNewUser(
    token: string,
    data: { name: string; email: string; password: string }
  ): Promise<User> {
    await delay(500)

    const invite = Object.values(mockInvites).find(i => i.token === token)
    if (!invite) {
      throw new Error('Convite inválido ou expirado')
    }

    if (invite.expiresAt < new Date()) {
      throw new Error('Convite expirado')
    }

    if (data.email !== invite.email) {
      throw new Error('Email não corresponde ao convite')
    }

    const existingUser = Object.values(mockUsers).find(
      u => u.email === data.email
    )
    if (existingUser) {
      throw new Error('Usuário com este email já existe')
    }

    const newUser: User = {
      id: `user${Date.now()}`,
      name: data.name,
      email: data.email,
      activeCompanyId: invite.companyId,
      createdAt: new Date()
    }

    mockUsers[newUser.id] = newUser

    const newMembership: Membership = {
      id: `membership${Date.now()}`,
      userId: newUser.id,
      companyId: invite.companyId,
      role: invite.role,
      createdAt: new Date()
    }

    mockMemberships[newMembership.id] = newMembership

    delete mockInvites[invite.id]

    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(newUser))
    }

    return newUser
  }
}
