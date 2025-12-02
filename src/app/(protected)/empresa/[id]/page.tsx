'use client'

import { motion } from 'framer-motion'
import { NextPage } from 'next'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { companyService } from '@/services/Company'
import { inviteService } from '@/services/Invite'
import { membershipService } from '@/services/Membership'
import type { Company } from '@/types/Company'
import type { MembershipWithUser } from '@/types/Membership'
import { Role } from '@/types/Role'

import { InviteMemberForm } from './_components/InviteMemberModal'
import { InviteFormData } from './_components/InviteMemberModal/schemas'
import { MemberTable } from './_components/MemberTable'

const Page: NextPage = () => {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const companyId = params.id as string

  const [company, setCompany] = useState<Company | null>(null)
  const [members, setMembers] = useState<MembershipWithUser[]>([])
  const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCompanyData = async () => {
      if (!user || !companyId) {
        router.push('/dashboard')
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const result = await companyService.getCompanyWithUserRole(
          companyId,
          user.id
        )

        if (!result) {
          setError('Você não tem acesso a esta empresa')
          router.push('/dashboard')
          return
        }

        setCompany(result.company)
        setCurrentUserRole(result.role)

        const companyMembers =
          await membershipService.listMembersByCompany(companyId)
        setMembers(companyMembers)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Falha ao carregar empresa'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadCompanyData()
  }, [user, companyId, router])

  const handleInviteMember = async (data: InviteFormData) => {
    if (!companyId) return

    try {
      await inviteService.createInvite(companyId, data)
      setIsDialogOpen(false)
    } catch (err) {
      console.error({ handleInviteMemberError: err })
    }
  }

  const handleRoleChange = async (membershipId: string, newRole: Role) => {
    if (!user) return

    try {
      await membershipService.updateMemberRole(membershipId, newRole)

      const updatedMembers =
        await membershipService.listMembersByCompany(companyId)
      setMembers(updatedMembers)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao alterar papel')
    }
  }

  const handleRemoveMember = async (membershipId: string) => {
    if (!user) return

    try {
      await membershipService.removeMember(membershipId)

      const updatedMembers =
        await membershipService.listMembersByCompany(companyId)
      setMembers(updatedMembers)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao remover membro')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="border-muted border-t-primary inline-block h-8 w-8 animate-spin rounded-full border-4" />
      </div>
    )
  }

  if (error && !company) {
    return (
      <motion.div
        animate={{ opacity: 1 }}
        className="border-destructive/50 bg-destructive/10 text-destructive rounded-lg border p-6"
        initial={{ opacity: 0 }}
      >
        {error}
      </motion.div>
    )
  }

  const canInvite =
    currentUserRole === Role.OWNER || currentUserRole === Role.ADMIN

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
    >
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              {company?.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie os membros da sua empresa
            </p>
          </div>

          {canInvite && (
            <InviteMemberForm
              isDialogOpen={isDialogOpen}
              isLoading={isLoading}
              onSubmit={handleInviteMember}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </div>
      </motion.div>

      {error && (
        <motion.div
          animate={{ opacity: 1 }}
          className="bg-destructive/10 text-destructive rounded-md p-3 text-sm"
          initial={{ opacity: 0 }}
        >
          {error}
        </motion.div>
      )}

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-foreground mb-4 text-xl font-semibold">
          Membros ({members.length})
        </h2>

        <MemberTable
          currentUserRole={currentUserRole || Role.MEMBER}
          isLoading={isLoading}
          members={members}
          onRemoveMember={handleRemoveMember}
          onRoleChange={handleRoleChange}
        />
      </motion.div>
    </motion.div>
  )
}

export default Page
