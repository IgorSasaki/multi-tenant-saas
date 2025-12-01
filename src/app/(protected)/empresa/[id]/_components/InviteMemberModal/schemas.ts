import { z } from 'zod'

import { Role } from '@/types/Role'

export const inviteSchema = z.object({
  email: z.email('E-mail'),
  role: z.enum([Role.ADMIN, Role.MEMBER], {
    message: 'Perfil inválido'
  })
})

export type InviteFormData = z.infer<typeof inviteSchema>
