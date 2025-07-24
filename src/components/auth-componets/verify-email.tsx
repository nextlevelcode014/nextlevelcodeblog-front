'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FaEnvelope } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useVerifyEmailMuation } from '@/services/muations'

export default function VerifyEmail() {
  const [message, setMessage] = useState(false)
  const router = useRouter()
  const token = useSearchParams().get('token')
  const verifyEmailMutation = useVerifyEmailMuation()

  useEffect(() => {
    setMessage(true)
    setTimeout(() => {
      router.replace('/auth/login')
    }, 2000)
  }, [verifyEmailMutation.isSuccess])

  useEffect(() => {
    if (token && !message) {
      verifyEmailMutation.mutate(token)
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-400">
            E-mail verification
          </h2>

          {message ? (
            <p className="mt-2 text-center text-sm text-green-600">
              ✅ E-mail verified successful!
            </p>
          ) : verifyEmailMutation.isError ? (
            <p className="mt-2 text-center text-sm text-red-600">
              ❌ Service unavailable!
            </p>
          ) : (
            <p className="mt-2 text-center text-sm text-gray-600">
              Verifying your e-mail...
            </p>
          )}
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="flex items-center justify-center">
            <FaEnvelope className="h-16 w-16 text-blue-500 mb-4" />
          </div>
        </div>
        {!message && !verifyEmailMutation.isError && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  )
}
