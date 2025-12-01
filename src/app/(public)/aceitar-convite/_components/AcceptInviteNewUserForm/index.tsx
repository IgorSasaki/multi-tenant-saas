'use client'

import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'

import { NewUserFormData, newUserSchema } from './schemas'
import { AcceptInviteNewUserFormProps } from './types'

export const AcceptInviteNewUserForm: FC<AcceptInviteNewUserFormProps> = ({
  onAccept,
  isLoading,
  email
}) => {
  const [generalError, setGeneralError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewUserFormData>({
    resolver: zodResolver(newUserSchema)
  })

  const onSubmit = async (data: NewUserFormData) => {
    setGeneralError(null)
    try {
      await onAccept({ name: data.name, password: data.password })
    } catch (err) {
      setGeneralError(
        err instanceof Error ? err.message : 'Falha ao aceitar o convite'
      )
    }
  }

  return (
    <motion.form
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 10 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Criar sua conta</CardTitle>
          <CardDescription>
            Cadastre-se para aceitar este convite para {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {generalError && (
            <motion.div
              animate={{ opacity: 1 }}
              className="bg-destructive/10 text-destructive rounded-md p-3 text-sm"
              initial={{ opacity: 0 }}
            >
              {generalError}
            </motion.div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              {...register('name')}
              className={errors.name ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              placeholder="No mínimo 8 caracteres"
              type="password"
              {...register('password')}
              className={errors.password ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-destructive text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              placeholder="Confirme sua senha"
              type="password"
              {...register('confirmPassword')}
              className={errors.confirmPassword ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-destructive text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? 'Criando conta...' : 'Criar Conta & Aceitar Convite'}
          </Button>
        </CardContent>
      </Card>
    </motion.form>
  )
}
