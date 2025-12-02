import { apiFetch } from '@/lib/api'
import type { SignInData, SignupData, User } from '@/types/User'

import { AuthResponse } from './types'

let currentSessionUser: User | null = null

export const authService = {
  async login(credentials: SignInData): Promise<User> {
    const { user } = await apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: {
        email: credentials.email,
        password: credentials.password
      }
    })

    currentSessionUser = user

    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user))
    }

    return user
  },

  async signup(data: SignupData): Promise<User> {
    const { user } = await apiFetch<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })

    currentSessionUser = user

    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user))
    }

    return user
  },

  async getCurrentUser(): Promise<User | null> {
    if (currentSessionUser) {
      return currentSessionUser
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser')
      if (stored) {
        currentSessionUser = JSON.parse(stored) as User
        return currentSessionUser
      }
    }

    try {
      const user = await apiFetch<User>('/auth/me')
      currentSessionUser = user

      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(user))
      }

      return user
    } catch {
      return null
    }
  },

  logout(): void {
    void apiFetch<void>('/auth/logout', { method: 'POST' })

    currentSessionUser = null

    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser')
    }
  }
}
