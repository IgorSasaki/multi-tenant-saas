import type { Invite, InviteInput } from '@/types/Invite'
import { Role } from '@/types/Role'
import { delay } from '@/utils/delay'

const mockInvites: Record<string, Invite> = {}

function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

export const inviteMockService = {
  async createInvite(companyId: string, data: InviteInput): Promise<Invite> {
    await delay(500)

    if (data.role === Role.OWNER) {
      throw new Error(
        'Você não pode criar um convite com o perfil de PROPRIETÁRIO'
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
      createdAt: new Date()
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

  async acceptInvite(token: string): Promise<void> {
    await delay(500)

    const invite = Object.values(mockInvites).find(i => i.token === token)
    if (!invite) {
      throw new Error('Convite inválido ou expirado')
    }

    if (invite.expiresAt < new Date()) {
      throw new Error('Convite expirado')
    }
  }
}
