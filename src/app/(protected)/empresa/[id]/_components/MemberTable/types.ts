import type { MembershipWithUser } from '@/types/Membership'
import { Role } from '@/types/Role'

export interface MemberTableProps {
  currentUserRole: Role
  isLoading?: boolean
  members: MembershipWithUser[]
  onRemoveMember?: (membershipId: string) => Promise<void>
  onRoleChange?: (membershipId: string, newRole: Role) => Promise<void>
}
