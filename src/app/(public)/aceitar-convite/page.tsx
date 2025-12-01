'use client'

import { motion } from 'framer-motion'
import { NextPage } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { inviteMockService } from '@/services/Invite/mock'
import { membershipMockService } from '@/services/Membership/mock'
import type { Invite } from '@/types/Invite'
import { Role } from '@/types/Role'

import { AcceptInviteExistingUserForm } from './_components/AcceptInviteExistingUserForm'
import { AcceptInviteNewUserForm } from './_components/AcceptInviteNewUserForm'

const ROLE_LABEL = {
  [Role.OWNER]: 'Proprietário',
  [Role.ADMIN]: 'Administrador',
  [Role.MEMBER]: 'Membro'
}

const Page: NextPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { success, error } = useToast()

  const token = searchParams.get('token')
  const [invite, setInvite] = useState<
    (Invite & { isExpired: boolean }) | null
  >(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorState, setErrorState] = useState<string | null>(null)

  useEffect(() => {
    const loadInvite = async () => {
      if (!token) {
        setErrorState('Link de convite inválido')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const inviteData = await inviteMockService.getInviteByToken(token)

        if (!inviteData || inviteData.isExpired) {
          setErrorState('Esse convite está expirado')
          return
        }

        setInvite(inviteData)
      } catch (err) {
        setErrorState(
          err instanceof Error ? err.message : 'Falha em carregar o convite'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadInvite()
  }, [token])

  const handleAcceptAsExistingUser = async () => {
    if (!invite || !user || !token) return

    try {
      setIsLoading(true)
      await inviteMockService.acceptInviteAsExistingUser(token, user.id)
      await membershipMockService.addMembership(
        user.id,
        invite.companyId,
        invite.role
      )

      success('Convite aceito com sucesso!')
      router.push(`/empresa/${invite.companyId}`)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Falha em aceitar o convite'
      error(message)
      setErrorState(message)
      setIsLoading(false)
    }
  }

  const handleAcceptAsNewUser = async (data: {
    name: string
    password: string
  }) => {
    if (!invite || !token) return

    try {
      setIsLoading(true)
      await inviteMockService.acceptInviteAsNewUser(token, {
        name: data.name,
        email: invite.email,
        password: data.password
      })

      success('Conta criada e convite aceito com sucesso!')
      // Reload auth context with new user
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push(`/empresa/${invite.companyId}`)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Falha ao aceitar convite'
      error(message)
      setErrorState(message)
      setIsLoading(false)
    }
  }

  if (isLoading || authLoading) {
    return (
      <AuthLayout title="">
        <div className="flex items-center justify-center py-12">
          <div className="border-muted border-t-primary inline-block h-8 w-8 animate-spin rounded-full border-4" />
        </div>
      </AuthLayout>
    )
  }

  if (errorState || !invite) {
    return (
      <AuthLayout title="">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
        >
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle>Erro de convite</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive mb-4">
                {errorState || 'O link de convite não é mais válido'}
              </p>
              <Button onClick={() => router.push('/login')} variant="outline">
                Voltar ao login
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      description={`Junte-se a ${invite.company?.name || 'a empresa'} com papel: ${ROLE_LABEL[invite.role]}`}
      title="Você foi convidado"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
      >
        {user && user.email !== invite.email ? (
          <div>
            <p className="text-muted-foreground mb-4 text-sm">
              Você está logado como {user.email}. Este convite é para{' '}
              {invite.email}. Faça logout e aceite com o email correto.
            </p>
            <Button
              className="w-full"
              onClick={() => router.push('/login')}
              variant="outline"
            >
              Sair e Aceitar
            </Button>
          </div>
        ) : user ? (
          <AcceptInviteExistingUserForm
            isLoading={isLoading}
            onAccept={handleAcceptAsExistingUser}
            userName={user.name}
          />
        ) : (
          <AcceptInviteNewUserForm
            email={invite.email}
            isLoading={isLoading}
            onAccept={handleAcceptAsNewUser}
          />
        )}
      </motion.div>
    </AuthLayout>
  )
}

export default Page
