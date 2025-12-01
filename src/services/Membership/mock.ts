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
      throw new Error('Membro não encontrado')
    }

    const requesterMembership = Object.values(mockMemberships).find(
      m => m.userId === requesterId && m.companyId === companyId
    )

    if (!requesterMembership) {
      throw new Error('Permissão insuficiente')
    }

    const isRequesterAdmin =
      requesterMembership.role === Role.OWNER ||
      requesterMembership.role === Role.ADMIN

    if (!isRequesterAdmin) {
      throw new Error('Permissão insuficiente')
    }

    if (
      membership.role === Role.OWNER &&
      newRole !== Role.OWNER &&
      requesterMembership.role !== Role.OWNER
    ) {
      throw new Error('Apenas o PROPRIETÁRIO pode modificar outro PROPRIETÁRIO')
    }

    if (newRole === Role.OWNER && requesterMembership.role !== Role.OWNER) {
      throw new Error('Não pode setar esse usuário como PROPRIETÁRIO')
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
      throw new Error('Membro não encontrado')
    }

    const requesterMembership = Object.values(mockMemberships).find(
      m => m.userId === requesterId && m.companyId === companyId
    )

    if (!requesterMembership) {
      throw new Error('Permissão insuficiente')
    }

    const isRequesterAdmin =
      requesterMembership.role === Role.OWNER ||
      requesterMembership.role === Role.ADMIN

    if (!isRequesterAdmin) {
      throw new Error('Permissão insuficiente')
    }

    if (membership.role === Role.OWNER) {
      const ownerCount = Object.values(mockMemberships).filter(
        m => m.companyId === companyId && m.role === Role.OWNER
      ).length

      if (ownerCount <= 1) {
        throw new Error('Não pode remover o último PROPRIETÁRIO')
      }

      if (requesterMembership.role !== Role.OWNER) {
        throw new Error(
          'Apenas um PROPRIETÁRIO pode remover outro PROPRIETÁRIO'
        )
      }
    }

    delete mockMemberships[membershipId]
  }
}
