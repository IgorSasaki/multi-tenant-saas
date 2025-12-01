import { Company } from './Company'
import { Role } from './Role'
import { User } from './User'

export interface Membership {
  company?: Company
  companyId: string
  createdAt: Date
  id: string
  role: Role
  user?: User
  userId: string
}

export interface MembershipWithUser extends Membership {
  user: User
}
