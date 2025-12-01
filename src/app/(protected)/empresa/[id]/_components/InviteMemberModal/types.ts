import { InviteFormData } from './schemas'

export interface InviteMemberFormProps {
  isDialogOpen: boolean
  isLoading?: boolean
  onSubmit: (data: InviteFormData) => Promise<void>
  setIsDialogOpen: (isDialogOpen: boolean) => void
}
