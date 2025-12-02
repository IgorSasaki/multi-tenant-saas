import { MembershipWithUser } from '@/types/Membership'

export type PaginatedMembers = {
  members: MembershipWithUser[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}
