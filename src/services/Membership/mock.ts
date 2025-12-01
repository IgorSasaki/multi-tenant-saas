import { mockMemberships, mockUsers } from '@/mocks/data'
import { MembershipWithUser } from '@/types/Membership'
import { Role } from '@/types/Role'
import { delay } from '@/utils/delay'

export const membershipMockService = {
  async listMembersByCompany(companyId: string): Promise<MembershipWithUser[]> {
    await delay(500)

    const members = Object.values(mockMemberships)
      .filter(m => m.companyId === companyId)
      .map(m => ({
        ...m,
        user: mockUsers[m.userId]
      }))
      .filter(m => m.user)

    return members as MembershipWithUser[]
  },

  async updateMemberRole(
    membershipId: string,
    newRole: Role,
    requesterId: string,
    companyId: string
  ): Promise<void> {
    await delay(500)

    const membership = mockMemberships[membershipId]
    if (!membership) {
      throw new Error('Membership not found')
    }

    const requesterMembership = Object.values(mockMemberships).find(
      m => m.userId === requesterId && m.companyId === companyId
    )

    if (!requesterMembership) {
      throw new Error('Insufficient permissions')
    }

    const isRequesterAdmin =
      requesterMembership.role === Role.OWNER ||
      requesterMembership.role === Role.ADMIN

    if (!isRequesterAdmin) {
      throw new Error('Insufficient permissions')
    }

    if (
      membership.role === Role.OWNER &&
      newRole !== Role.OWNER &&
      requesterMembership.role !== Role.OWNER
    ) {
      throw new Error('Only OWNER can modify another OWNER')
    }

    if (newRole === Role.OWNER && requesterMembership.role !== Role.OWNER) {
      throw new Error('Cannot set user as OWNER')
    }

    membership.role = newRole
  },

  async removeMember(
    membershipId: string,
    requesterId: string,
    companyId: string
  ): Promise<void> {
    await delay(500)

    const membership = mockMemberships[membershipId]
    if (!membership) {
      throw new Error('Membership not found')
    }

    const requesterMembership = Object.values(mockMemberships).find(
      m => m.userId === requesterId && m.companyId === companyId
    )

    if (!requesterMembership) {
      throw new Error('Insufficient permissions')
    }

    const isRequesterAdmin =
      requesterMembership.role === Role.OWNER ||
      requesterMembership.role === Role.ADMIN

    if (!isRequesterAdmin) {
      throw new Error('Insufficient permissions')
    }

    if (membership.role === Role.OWNER) {
      const ownerCount = Object.values(mockMemberships).filter(
        m => m.companyId === companyId && m.role === Role.OWNER
      ).length

      if (ownerCount <= 1) {
        throw new Error('Cannot remove the last OWNER')
      }

      if (requesterMembership.role !== Role.OWNER) {
        throw new Error('Only OWNER can remove another OWNER')
      }
    }

    delete mockMemberships[membershipId]
  }
}
