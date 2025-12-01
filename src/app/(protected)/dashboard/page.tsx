'use client'

import { motion } from 'framer-motion'
import { NextPage } from 'next'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

const DashboardPage: NextPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
    >
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <article>
            <h1 className="text-foreground text-3xl font-bold">
              Minhas Empresas
            </h1>
            <p className="text-muted-foreground mt-2">
              Gerencie suas empresas e equipes
            </p>
          </article>

          <Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
            <Button onClick={() => setIsDialogOpen(true)}>
              + Criar Empresa
            </Button>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Empresa</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          animate={{ opacity: 1 }}
          className="border-border bg-muted/50 rounded-lg border-2 border-dashed p-12 text-center"
          initial={{ opacity: 0 }}
        >
          <p className="text-muted-foreground mb-4">
            Você ainda não tem nenhuma empresa
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            Criar Primeira Empresa
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default DashboardPage
