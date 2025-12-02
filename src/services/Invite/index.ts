import { apiFetch } from '@/lib/api'
import type { Invite, InviteInput } from '@/types/Invite'
import type { User } from '@/types/User'

import { PaginatedInvites, InviteDetailsResponse } from './types'

export const inviteService = {
  async createInvite(companyId: string, data: InviteInput): Promise<Invite> {
    const invite = await apiFetch<Invite>(`/company/${companyId}/invite`, {
      method: 'POST',
      body: {
        email: data.email,
        role: data.role
      }
    })

    return {
      ...invite,
      createdAt: new Date(invite.createdAt),
      expiresAt: new Date(invite.expiresAt)
    }
  },

  async listInvitesByCompany(companyId: string): Promise<Invite[]> {
    const { invites } = await apiFetch<PaginatedInvites>(
      `/company/${companyId}/invites?page=1&pageSize=100`
    )

    return invites.map(i => ({
      ...i,
      createdAt: new Date(i.createdAt),
      expiresAt: new Date(i.expiresAt)
    }))
  },

  async getInviteByToken(
    token: string
  ): Promise<(Invite & { isExpired: boolean }) | null> {
    try {
      const invite = await apiFetch<InviteDetailsResponse>(`/invite/${token}`)

      const isExpired = new Date(invite.expiresAt) < new Date()

      return {
        ...invite,
        createdAt: new Date(invite.createdAt),
        expiresAt: new Date(invite.expiresAt),
        isExpired
      }
    } catch {
      return null
    }
  },

  async acceptInviteAsExistingUser(token: string): Promise<void> {
    await apiFetch<void>(`/invite/${token}/accept`, {
      method: 'POST'
    })
  },

  async acceptInviteAsNewUser(
    token: string,
    data: { name: string; email: string; password: string }
  ): Promise<{ user: User; requiresLogin?: boolean }> {
    const response = await apiFetch<{
      user: User
      requiresLogin?: boolean
    }>(`/invite/${token}/accept`, {
      method: 'POST',
      body: {
        name: data.name,
        password: data.password
      }
    })

    if (response.requiresLogin) {
      return response
    }

    const user = {
      ...response.user,
      createdAt: new Date(response.user.createdAt)
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user))
    }

    return { user }
  },

  async cancelInvite(companyId: string, token: string): Promise<void> {
    await apiFetch<void>(`/company/${companyId}/invite/${token}`, {
      method: 'DELETE'
    })
  }
}
