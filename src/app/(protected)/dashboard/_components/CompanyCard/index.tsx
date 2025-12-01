'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Role } from '@/types/Role'

import { CompanyCardProps } from './types'

export const CompanyCard: FC<CompanyCardProps> = ({
  company,
  userRole,
  isActive = false,
  onSelect
}) => {
  const ROLE_LABEL = {
    [Role.OWNER]: 'Proprietário',
    [Role.ADMIN]: 'Administrador',
    [Role.MEMBER]: 'Membro'
  }[userRole]

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card
        className={`overflow-hidden transition-all ${isActive ? 'ring-primary ring-2' : ''}`}
      >
        <div className="p-6">
          <div className="mb-4 flex items-start justify-between">
            {company.logo && (
              <div className="bg-muted relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  alt={company.name}
                  className="object-cover"
                  src={company.logo || '/placeholder.svg'}
                  fill
                />
              </div>
            )}
            <Badge className="ml-auto" variant="outline">
              {ROLE_LABEL}
            </Badge>
          </div>

          <h3 className="text-foreground mb-2 text-lg font-semibold">
            {company.name}
          </h3>

          <p className="text-muted-foreground mb-4 text-sm">
            Criada em {new Date(company.createdAt).toLocaleDateString('pt-BR')}
          </p>

          <div className="flex gap-2">
            <Link className="flex-1" href={`/empresa/${company.id}`}>
              <Button className="w-full" variant="default">
                Ver Detalhes
              </Button>
            </Link>
            <Button
              onClick={onSelect}
              variant={isActive ? 'default' : 'outline'}
            >
              {isActive ? '✓ Ativa' : 'Selecionar'}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
