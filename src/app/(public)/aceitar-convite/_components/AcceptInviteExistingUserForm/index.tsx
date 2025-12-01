'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { AcceptInviteExistingUserFormProps } from './types'

export const AcceptInviteExistingUserForm: FC<
  AcceptInviteExistingUserFormProps
> = ({ onAccept, isLoading, userName }) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Pronto para entrar?</CardTitle>
          <CardDescription>Você está logado como {userName}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" disabled={isLoading} onClick={onAccept}>
            {isLoading ? 'Aceitando...' : 'Aceitar Convite'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
