'use client'

import { useCallback, useState } from 'react'

import { membershipService } from '@/services/Membership'
import { MembershipWithUser } from '@/types/Membership'
import { Role } from '@/types/Role'

export function useMembers() {
  const [members, setMembers] = useState<MembershipWithUser[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadMembers = useCallback(async (companyId: string) => {
    setIsLoading(true)
    try {
      const data = await membershipService.listMembersByCompany(companyId)
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
        await membershipService.updateMemberRole(membershipId, newRole)
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
        await membershipService.removeMember(membershipId)
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
