'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RootPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="border-muted border-t-primary inline-block h-8 w-8 animate-spin rounded-full border-4" />
    </div>
  )
}

export default RootPage
