// app/forgot-password/page.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa'
import { forgotPasswordSchema } from '@/services/schemas'
import { apiService } from '@/services/api'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: apiService.forgotPassword,
    onSuccess: () => {
      setTimeout(() => {
        router.push('/')
      }, 2000)
    },
  })

  const onSubmit = (data: { email: string }) => {
    mutation.mutate(data.email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-400">
            forgot your password?
          </h2>
          {mutation.isSuccess ? (
            <p className="mt-2 text-center text-sm text-green-600">
              ✅ Sent e-mail!
            </p>
          ) : (
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your e-mail to receive the verification link.
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                E-mail
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  placeholder="Enter your e-mail"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-[#242424] border-gray-300 placeholder-gray-500 text-gray-300 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.email ? (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              ) : mutation.error ? (
                <p className="text-sm text-red-500 mt-1">
                  {mutation.error.message}
                </p>
              ) : null}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaPaperPlane className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
              </span>
              {mutation.isPending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
