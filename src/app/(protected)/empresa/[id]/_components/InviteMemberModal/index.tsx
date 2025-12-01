'use client'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import { Role } from '@/types/Role'
import { zodResolver } from '@hookform/resolvers/zod'

import { inviteSchema, type InviteFormData } from './schemas'
import { InviteMemberFormProps } from './types'

export const InviteMemberForm: FC<InviteMemberFormProps> = ({
  onSubmit,
  isLoading = false,
  isDialogOpen,
  setIsDialogOpen
}) => {
  const { success, error } = useToast()

  const form = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      role: Role.MEMBER
    }
  })

  const handleSubmit = async (data: InviteFormData) => {
    try {
      await onSubmit(data)
      success('Convite enviado com sucesso!')
      form.reset()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Falha ao enviar convite'
      error(errorMessage)
    }
  }

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <Button onClick={() => setIsDialogOpen(true)}>+ Convidar Membro</Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convidar Novo Membro</DialogTitle>
        </DialogHeader>
        <motion.form
          animate={{ opacity: 1 }}
          className="space-y-4"
          initial={{ opacity: 0 }}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div>
            <Label className="text-sm font-medium" htmlFor="email">
              E-mail do Membro
            </Label>
            <Input
              className="mt-2"
              id="email"
              placeholder="membro@exemplo.com"
              type="email"
              {...form.register('email')}
              disabled={isLoading}
            />
            {form.formState.errors.email && (
              <p className="text-destructive mt-1 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium" htmlFor="role">
              Papel
            </Label>
            <Select
              onValueChange={value =>
                form.setValue('role', value as Role.ADMIN | Role.MEMBER)
              }
              value={form.watch('role') as Role.ADMIN | Role.MEMBER}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Role.ADMIN}>Administrador</SelectItem>
                <SelectItem value={Role.MEMBER}>Membro</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.role && (
              <p className="text-destructive mt-1 text-sm">
                {form.formState.errors.role.message}
              </p>
            )}
          </div>

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? 'Enviando...' : 'Convidar Membro'}
          </Button>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
