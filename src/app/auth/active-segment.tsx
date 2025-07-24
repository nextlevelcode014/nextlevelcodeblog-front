'use client'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { ReactNode } from 'react'

export default function ActiveSegment({
  login,
  register,
}: {
  login: ReactNode
  register: ReactNode
}) {
  const activeSegment = useSelectedLayoutSegment()
  const router = usePathname()
  const isHome = router === '/auth'

  const isValidRoute =
    isHome ||
    ['login', 'register', 'auth', 'verify-email'].includes(activeSegment || '')

  return (
    <>
      {isValidRoute ? (
        <>
          {activeSegment === 'login' && login}
          {isHome && login}
          {activeSegment === 'register' && register}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500">
          <h1 className="text-2xl font-bold">Page not found.</h1>
          <Link
            href="/"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Back to home
          </Link>
        </div>
      )}
    </>
  )
}
