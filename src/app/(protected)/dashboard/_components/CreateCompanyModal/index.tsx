'use client'

import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'

import { companySchema, type CompanyFormData } from './schemas'
import { CreateCompanyModalProps } from './types'

export const CreateCompanyModal: FC<CreateCompanyModalProps> = ({
  onSubmit,
  isLoading = false,
  isDialogOpen = false,
  setIsDialogOpen
}) => {
  const [error, setError] = useState<string | null>(null)

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      logo: ''
    }
  })

  const handleSubmit = async (data: CompanyFormData) => {
    setError(null)
    try {
      await onSubmit(data)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar empresa')
    }
  }

  return (
    <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
      <Button onClick={() => setIsDialogOpen(true)}>+ Criar Empresa</Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Empresa</DialogTitle>
        </DialogHeader>
        <motion.form
          animate={{ opacity: 1 }}
          className="space-y-4"
          initial={{ opacity: 0 }}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <fieldset>
            <Label className="text-sm font-medium" htmlFor="name">
              Nome da Empresa
            </Label>
            <Input
              className="mt-2"
              id="name"
              placeholder="Minha Empresa"
              {...form.register('name')}
              disabled={isLoading}
            />
            {form.formState.errors.name && (
              <p className="text-destructive mt-1 text-sm">
                {form.formState.errors.name.message}
              </p>
            )}
          </fieldset>

          <div>
            <Label className="text-sm font-medium" htmlFor="logo">
              URL da Logo (opcional)
            </Label>
            <Input
              className="mt-2"
              id="logo"
              placeholder="https://..."
              type="url"
              {...form.register('logo')}
              disabled={isLoading}
            />
            {form.formState.errors.logo && (
              <p className="text-destructive mt-1 text-sm">
                {form.formState.errors.logo.message}
              </p>
            )}
          </div>

          {error && (
            <motion.div
              animate={{ opacity: 1 }}
              className="bg-destructive/10 text-destructive rounded-md p-3 text-sm"
              initial={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? 'Criando...' : 'Criar Empresa'}
          </Button>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
}
