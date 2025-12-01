'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'

import { CONTAINER_VARIANTS, ITEM_VARIANTS } from './data'
import { loginSchema, type LoginFormData } from './schemas'

export const LoginForm: FC = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmitSignIn = async (data: LoginFormData) => {
    setIsSubmitting(true)

    try {
      console.log({ data })

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
        <a className="text-primary font-medium hover:underline" href="/signup">
          Cadastre-se
        </a>
      </motion.p>
    </motion.form>
  )
}
