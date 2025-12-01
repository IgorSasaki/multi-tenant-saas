import { z } from 'zod'

export const companySchema = z.object({
  name: z.string().min(1, 'Nome da empresa é obrigatório'),
  logo: z.url('URL inválida').optional().or(z.literal(''))
})

export type CompanyFormData = z.infer<typeof companySchema>
