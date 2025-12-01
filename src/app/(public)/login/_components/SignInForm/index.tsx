'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'

import { CONTAINER_VARIANTS, ITEM_VARIANTS } from './data'
import { signInSchema, type SignInFormData } from './schemas'

export const SignInForm: FC = () => {
  const router = useRouter()

  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmitSignIn = async (data: SignInFormData) => {
    setIsSubmitting(true)

    try {
      await login(data.email, data.password)

      router.push('/dashboard')
    } catch (error) {
      console.error({ handleSubmitSignInError: error })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      animate="visible"
      className="w-full max-w-sm space-y-6"
      initial="hidden"
      onSubmit={handleSubmit(handleSubmitSignIn)}
      variants={CONTAINER_VARIANTS}
    >
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
        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </motion.div>

      <motion.p
        className="text-muted-foreground text-center text-sm"
        variants={ITEM_VARIANTS}
      >
        Não tem conta?{' '}
        <Link
          className="text-primary font-medium hover:underline"
          href="/cadastro"
        >
          Cadastre-se
        </Link>
      </motion.p>
    </motion.form>
  )
}
