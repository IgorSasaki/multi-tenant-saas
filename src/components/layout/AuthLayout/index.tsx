'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'

import { AuthLayoutProps } from './types'

export const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  title,
  description
}) => {
  return (
    <div className="from-background to-muted flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-border bg-card rounded-lg border p-8 shadow-lg">
          <motion.div
            animate={{ opacity: 1 }}
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-foreground text-2xl font-bold">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-2 text-sm">
                {description}
              </p>
            )}
          </motion.div>

          <div className="flex justify-center">{children}</div>
        </div>

        <motion.p
          animate={{ opacity: 1 }}
          className="text-muted-foreground mt-6 text-center text-xs"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          Altaa © 2025
        </motion.p>
      </motion.div>
    </div>
  )
}
