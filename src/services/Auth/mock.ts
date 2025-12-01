import { mockUsers } from '@/mocks/data'
import type { User, SignInData, SignupData } from '@/types/User'
import { delay } from '@/utils/delay'

let currentSessionUser: User | null = null

export const authMockService = {
  async login(credentials: SignInData): Promise<User> {
    await delay(800)

    const user = Object.values(mockUsers).find(
      u => u.email === credentials.email
    )

    if (!user || credentials.password !== 'password123') {
      throw new Error('Invalid email or password')
    }

    currentSessionUser = user
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user))
    }

    return user
  },

  async signup(data: SignupData): Promise<User> {
    await delay(800)

    const existingUser = Object.values(mockUsers).find(
      u => u.email === data.email
    )

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const newUser: User = {
      id: `user${Date.now()}`,
      name: data.name,
      email: data.email,
      activeCompanyId: null,
      createdAt: new Date()
    }

    mockUsers[newUser.id] = newUser
    currentSessionUser = newUser
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(newUser))
    }

    return newUser
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(300)

    if (currentSessionUser) {
      return currentSessionUser
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser')
      if (stored) {
        currentSessionUser = JSON.parse(stored)
        return currentSessionUser
      }
    }

    return null
  },

  logout(): void {
    currentSessionUser = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser')
    }
  }
}
