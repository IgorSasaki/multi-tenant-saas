import { Invite } from '@/types/Invite'

export type PaginatedInvites = {
  invites: Invite[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type InviteDetailsResponse = Invite & {
  company: {
    id: string
    name: string
    logo: string | null
  }
}
