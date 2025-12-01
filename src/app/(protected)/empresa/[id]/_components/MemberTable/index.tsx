'use client'

import { motion } from 'framer-motion'
import { FC } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useToast } from '@/hooks/useToast'
import { Role } from '@/types/Role'

import { MemberTableProps } from './types'

const ROLE_LABEL = {
  [Role.OWNER]: 'Proprietário',
  [Role.ADMIN]: 'Administrador',
  [Role.MEMBER]: 'Membro'
}

export const MemberTable: FC<MemberTableProps> = ({
  members,
  currentUserRole,
  onRoleChange,
  onRemoveMember,
  isLoading = false
}) => {
  const { success, error } = useToast()
  const canManage =
    currentUserRole === Role.OWNER || currentUserRole === Role.ADMIN
  const isOwner = currentUserRole === Role.OWNER

  const handleRoleChange = async (membershipId: string, newRole: Role) => {
    try {
      if (onRoleChange) {
        await onRoleChange(membershipId, newRole)
        success('Papel do membro atualizado com sucesso!')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Falha ao atualizar papel'
      error(errorMessage)
    }
  }

  const handleRemoveMember = async (membershipId: string) => {
    try {
      if (onRemoveMember) {
        await onRemoveMember(membershipId)
        success('Membro removido com sucesso!')
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Falha ao remover membro'
      error(errorMessage)
    }
  }

  if (members.length === 0) {
    return (
      <motion.div
        animate={{ opacity: 1 }}
        className="border-border rounded-lg border p-8 text-center"
        initial={{ opacity: 0 }}
      >
        <p className="text-muted-foreground">Nenhum membro encontrado</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="border-border overflow-hidden rounded-lg border"
      initial={{ opacity: 0 }}
    >
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Papel</TableHead>
            {canManage && <TableHead>Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, idx) => (
            <motion.tr
              animate={{ opacity: 1, y: 0 }}
              className="border-border hover:bg-muted/50 border-t"
              initial={{ opacity: 0, y: 10 }}
              key={member.id}
              transition={{ delay: idx * 0.05 }}
            >
              <TableCell className="font-medium">{member.user.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {member.user.email}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{ROLE_LABEL[member.role]}</Badge>
              </TableCell>
              {canManage && (
                <TableCell>
                  <div className="flex gap-2">
                    {member.role !== Role.OWNER && (
                      <Select
                        onValueChange={role =>
                          handleRoleChange(member.id, role as Role)
                        }
                        disabled={isLoading}
                        value={member.role}
                      >
                        <SelectTrigger className="h-8 w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {isOwner && (
                            <SelectItem value={Role.ADMIN}>
                              Administrador
                            </SelectItem>
                          )}
                          <SelectItem value={Role.MEMBER}>Membro</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    {member.role !== Role.OWNER && onRemoveMember && (
                      <Button
                        disabled={isLoading}
                        onClick={() => handleRemoveMember(member.id)}
                        size="sm"
                        variant="destructive"
                      >
                        Remover
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}
