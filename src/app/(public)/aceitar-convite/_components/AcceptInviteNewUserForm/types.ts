export interface AcceptInviteNewUserFormProps {
  email: string
  isLoading: boolean
  onAccept: (data: { name: string; password: string }) => Promise<void>
}
