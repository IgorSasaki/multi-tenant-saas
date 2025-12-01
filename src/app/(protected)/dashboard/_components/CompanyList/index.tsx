'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'

import { Role } from '@/types/Role'

import { CompanyCard } from '../CompanyCard'
import { CompanyListProps } from './types'

export const CompanyList: FC<CompanyListProps> = ({
  companies,
  userRoles,
  activeCompanyId,
  onSelectCompany,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map(i => (
          <div className="bg-muted h-56 animate-pulse rounded-lg" key={i} />
        ))}
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <motion.div
        animate={{ opacity: 1 }}
        className="border-border bg-muted/50 rounded-lg border-2 border-dashed p-12 text-center"
        initial={{ opacity: 0 }}
      >
        <p className="text-muted-foreground">Nenhuma empresa encontrada</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      animate="show"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
    >
      {companies.map(company => (
        <CompanyCard
          company={company}
          isActive={activeCompanyId === company.id}
          key={company.id}
          onSelect={() => onSelectCompany(company.id)}
          userRole={userRoles[company.id] || Role.MEMBER}
        />
      ))}
    </motion.div>
  )
}
