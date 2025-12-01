'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'

import { CONTAINER_VARIANTS, ITEM_VARIANTS } from './data'
import { signUpSchema, type SignUpFormData } from './schemas'

export const SignUpForm: FC = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleSubmitSignUp = async (data: SignUpFormData) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      router.push('/dashboard')
    } catch (error) {
      console.error({ handleSubmitSignUpError: error })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      animate="visible"
      className="w-full max-w-sm space-y-6"
      initial="hidden"
      onSubmit={handleSubmit(handleSubmitSignUp)}
      variants={CONTAINER_VARIANTS}
    >
      <motion.div variants={ITEM_VARIANTS}>
        <Label className="text-sm font-medium" htmlFor="name">
          Nome Completo
        </Label>
        <Input
          className="mt-2"
          id="name"
          placeholder="João Silva"
          type="text"
          {...register('name')}
          disabled={isSubmitting}
        />
        {errors.name && (
          <motion.p
            animate={{ opacity: 1 }}
            className="text-destructive mt-1 text-sm"
            initial={{ opacity: 0 }}
          >
            {errors.name.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={ITEM_VARIANTS}>
        <Label className="text-sm font-medium" htmlFor="email">
          E-mail
        </Label>
        <Input
          className="mt-2"
          id="email"
          placeholder="seu@email.com"
          type="email"
          {...register('email')}
          disabled={isSubmitting}
        />
        {errors.email && (
          <motion.p
            animate={{ opacity: 1 }}
            className="text-destructive mt-1 text-sm"
            initial={{ opacity: 0 }}
          >
            {errors.email.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={ITEM_VARIANTS}>
        <Label className="text-sm font-medium" htmlFor="password">
          Senha
        </Label>
        <Input
          className="mt-2"
          id="password"
          placeholder="••••••••"
          type="password"
          {...register('password')}
          disabled={isSubmitting}
        />
        {errors.password && (
          <motion.p
            animate={{ opacity: 1 }}
            className="text-destructive mt-1 text-sm"
            initial={{ opacity: 0 }}
          >
            {errors.password.message}
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={ITEM_VARIANTS}>
        <Label className="text-sm font-medium" htmlFor="confirmPassword">
          Confirmar Senha
        </Label>
        <Input
          className="mt-2"
          id="confirmPassword"
          placeholder="••••••••"
          type="password"
          {...register('confirmPassword')}
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <motion.p
            animate={{ opacity: 1 }}
            className="text-destructive mt-1 text-sm"
            initial={{ opacity: 0 }}
          >
            {errors.confirmPassword.message}
          </motion.p>
        )}
      </motion.div>

      {apiError && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 text-destructive rounded-md p-3 text-sm"
          initial={{ opacity: 0, y: -10 }}
        >
          {apiError}
        </motion.div>
      )}

      <motion.div variants={ITEM_VARIANTS}>
        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </motion.div>

      <motion.p
        className="text-muted-foreground text-center text-sm"
        variants={ITEM_VARIANTS}
      >
        Já tem conta?{' '}
        <Link
          className="text-primary font-medium hover:underline"
          href="/login"
        >
          Faça login
        </Link>
      </motion.p>
    </motion.form>
  )
}
