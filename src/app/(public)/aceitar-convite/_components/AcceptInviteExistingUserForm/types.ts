export interface AcceptInviteExistingUserFormProps {
  isLoading: boolean
  onAccept: () => Promise<void>
  userName: string
}
