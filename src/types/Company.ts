export interface Company {
  createdAt: Date
  id: string
  logo: string | null
  name: string
}

export interface CompanyCreateInput {
  logo?: string
  name: string
}
