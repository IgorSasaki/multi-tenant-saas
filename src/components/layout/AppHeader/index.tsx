'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'

export const AppHeader: FC = () => {
  return (
    <header className="border-border bg-card border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
        >
          <h1 className="text-foreground text-lg font-bold">Altaa</h1>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
        ></motion.div>
      </div>
    </header>
  )
}
