import { User } from '@/types/User'

export type AuthResponse = {
  user: User
  token?: string
}
