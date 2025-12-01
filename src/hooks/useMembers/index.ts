'use client'

import { useCallback, useState } from 'react'

import { membershipMockService } from '@/services/Membership/mock'
import { MembershipWithUser } from '@/types/Membership'
import { Role } from '@/types/Role'

export function useMembers() {
  const [members, setMembers] = useState<MembershipWithUser[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadMembers = useCallback(async (companyId: string) => {
    setIsLoading(true)
    try {
      const data = await membershipMockService.listMembersByCompany(companyId)
      setMembers(data)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateMemberRole = useCallback(
    async (
      membershipId: string,
      newRole: Role,
      requesterId: string,
      companyId: string
    ) => {
      setIsLoading(true)
      try {
        await membershipMockService.updateMemberRole(
          membershipId,
          newRole,
          requesterId,
          companyId
        )
        await loadMembers(companyId)
      } finally {
        setIsLoading(false)
      }
    },
    [loadMembers]
  )

  const removeMember = useCallback(
    async (membershipId: string, requesterId: string, companyId: string) => {
      setIsLoading(true)
      try {
        await membershipMockService.removeMember(
          membershipId,
          requesterId,
          companyId
        )
        await loadMembers(companyId)
      } finally {
        setIsLoading(false)
      }
    },
    [loadMembers]
  )

  return {
    members,
    isLoading,
    loadMembers,
    updateMemberRole,
    removeMember
  }
}
