import { apiFetch } from '@/lib/api'
import type { MembershipWithUser } from '@/types/Membership'
import type { Role } from '@/types/Role'

import { PaginatedMembers } from './types'

export const membershipService = {
  async addMembership(): Promise<void> {
    throw new Error('Use invite flow to add members')
  },

  async listMembersByCompany(companyId: string): Promise<MembershipWithUser[]> {
    const { members } = await apiFetch<PaginatedMembers>(
      `/company/${companyId}/members?page=1&pageSize=100`
    )

    return members.map(m => ({
      ...m,
      createdAt: new Date(m.createdAt)
    }))
  },

  async updateMemberRole(membershipId: string, newRole: Role): Promise<void> {
    await apiFetch<void>(`/membership/${membershipId}/role`, {
      method: 'PATCH',
      body: { role: newRole }
    })
  },

  async removeMember(membershipId: string): Promise<void> {
    await apiFetch<void>(`/membership/${membershipId}`, {
      method: 'DELETE'
    })
  }
}
