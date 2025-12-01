export interface User {
  activeCompanyId: string | null
  createdAt: Date
  email: string
  id: string
  name: string
}

export interface SignInData {
  email: string
  password: string
}

export interface SignupData {
  confirmPassword: string
  email: string
  name: string
  password: string
}
