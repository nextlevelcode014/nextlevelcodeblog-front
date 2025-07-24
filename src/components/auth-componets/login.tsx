'use client'

import { LoginData } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaLock } from 'react-icons/fa'
import { loginSchema } from '@/services/schemas'
import Link from 'next/link'
import LoginForm from './login-form'
import { useAuth } from '@/context/auth-context'
import { useLoginMutation } from '@/services/muations'
import { useRecaptcha } from '@/hooks/useRecaptcha'
import { useState } from 'react'
import GoogleLogin from './google-login'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoadingMessage, setIsloadingMessage] = useState(false)
  const loginMutation = useLoginMutation()
  const { getReCaptchaToken } = useRecaptcha()
  const { login } = useAuth()

  const handleLoginSuccess = (message: string) => {
    setSuccessMessage(message)
  }

  const handleLoginError = (message: string) => {
    setErrorMessage(message)
  }

  const handleLoading = (message: boolean) => {
    setIsloadingMessage(message)
  }

  const handleLogin = async (data: LoginData) => {
    try {
      const token = await getReCaptchaToken('login_user')

      if (!token) {
        setErrorMessage('❌ Erro ao validar reCAPTCHA. Tente novamente.')
        return
      }

      data.recaptchaToken = token
      data.authProvider = 'Credentials'

      const result = await loginMutation.mutateAsync(data)

      if (result.token) {
        login(result.token)
      }
    } catch (error) {
      setErrorMessage('Incorrect e-mail or password!')
    }
  }

  return (
    <div className="bg-[#242424] p-4 sm:p-6 rounded-lg w-full max-w-[90vw] mx-auto mt-8 sm:max-w-md">
      <div className="text-center mb-6 sm:mb-8">
        <FaLock className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500 mx-auto mb-3 sm:mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-teal-400">
          Restricted Access
        </h2>
        {errorMessage && (
          <p className="text-xs sm:text-sm text-red-500 mt-2 px-2">
            {errorMessage}
          </p>
        )}

        {!errorMessage && successMessage && (
          <p className="text-xs sm:text-sm text-green-500 mt-2 px-2">
            {successMessage}
          </p>
        )}

        {!errorMessage && !successMessage && isLoadingMessage && (
          <p className="text-xs sm:text-sm text-blue-500 mt-2 px-2">
            Loading...
          </p>
        )}

        {!errorMessage && !successMessage && !isLoadingMessage && (
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Join our community
          </p>
        )}
      </div>

      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        handleLogin={handleLogin}
        loginMutation={loginMutation}
        errors={errors}
      />

      <div className="pt-4 text-center space-y-2">
        <Link
          href="/confirm-auth/forgot-password"
          className="block text-sm sm:text-base text-blue-500 hover:text-blue-400 transition-colors"
        >
          Forgot your password?
        </Link>
        <span className="block text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors">
          Don't have an account?{' '}
          <Link
            href="/auth/register"
            className="text-blue-500 hover:text-blue-400"
          >
            Sign up
          </Link>
        </span>
        <span className="block text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors">
          <GoogleLogin
            onError={handleLoginError}
            onSuccess={handleLoginSuccess}
            isLoading={handleLoading}
          />
        </span>
      </div>
    </div>
  )
}
