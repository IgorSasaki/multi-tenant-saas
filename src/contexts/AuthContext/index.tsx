'use client'

import type React from 'react'
import { createContext, useCallback, useEffect, useState } from 'react'

import { authService } from '@/services/Auth'
import { type User } from '@/types/User'

import { AuthContextType } from './types'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Failed to initialize auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const userData = await authService.login({ email, password })
      setUser(userData)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true)
      try {
        const userData = await authService.signup({
          name,
          email,
          password,
          confirmPassword: password
        })
        setUser(userData)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
