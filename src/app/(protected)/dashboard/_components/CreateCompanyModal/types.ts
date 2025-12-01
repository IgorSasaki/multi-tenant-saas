import { CompanyFormData } from './schemas'

export interface CreateCompanyModalProps {
  isDialogOpen?: boolean
  isLoading?: boolean
  onSubmit: (data: CompanyFormData) => Promise<void>
  setIsDialogOpen: (isOpen: boolean) => void
}
