import { FC, PropsWithChildren } from 'react'

import { AppHeader } from '../AppHeader'

export const AppShell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <AppHeader />

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl p-6">{children}</div>
      </main>
    </div>
  )
}
