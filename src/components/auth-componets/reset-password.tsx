'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaLock, FaCheck } from 'react-icons/fa'
import { resetPasswordSchema } from '@/services/schemas'
import { ResetPasswordData } from '@/types'
import { useState } from 'react'
import { apiService } from '@/services/api'
import { useRecaptcha } from '@/hooks/useRecaptcha'

export default function ResetPasswordPage() {
  const [message, setMessage] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  })
  const token = useSearchParams().get('token') || ''
  const { getReCaptchaToken } = useRecaptcha()

  const mutation = useMutation({
    mutationFn: apiService.resetPassword,
    onSuccess: () => {
      setMessage('✅ Success!')
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    },
  })

  const onSubmit = async (data: ResetPasswordData) => {
    const recaptchaToken = await getReCaptchaToken('reset_password')
    if (!recaptchaToken) {
      setMessage('Atividade suspeita')
      return
    }
    mutation.mutate({ ...data, token, recaptchaToken })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-400">
            Redefinir Senha
          </h2>
          {message ? (
            <p className="mt-2 text-center text-sm text-green-600">{message}</p>
          ) : (
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your password again.
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="newPassword" className="sr-only">
                New password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="newPassword"
                  {...register('newPassword')}
                  placeholder="New password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-[#242424] border-gray-300 placeholder-gray-500 text-gray-300 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword')}
                  placeholder="Confirm password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-[#242424] border-gray-300 placeholder-gray-500 text-gray-300 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaCheck className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
              </span>
              {mutation.isPending ? 'Redefining...' : 'Reset password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
