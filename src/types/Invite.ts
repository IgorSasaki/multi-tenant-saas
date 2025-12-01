import type { Company } from './Company'
import type { Role } from './Role'

export interface Invite {
  company?: Company
  companyId: string
  createdAt: Date
  email: string
  expiresAt: Date
  id: string
  role: Role
  token: string
}

export interface InviteInput {
  email: string
  role: Role
}
