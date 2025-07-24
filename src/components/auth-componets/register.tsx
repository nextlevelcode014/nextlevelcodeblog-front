'use client'

import { useEffect, useState } from 'react'
import { registerSchema } from '@/services/schemas'
import { RegisterData, RegisterDataForm } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import RegisterForm from './register-form'
import { useRegisterMutation } from '@/services/muations'
import { FaUserPlus } from 'react-icons/fa'
import { useRecaptcha } from '@/hooks/useRecaptcha'
import GoogleLogin from './google-login'

export default function Register() {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoadingMessage, setIsloadingMessage] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterDataForm>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const registerMutation = useRegisterMutation()
  const { getReCaptchaToken } = useRecaptcha()

  const handleLoginSuccess = (message: string) => {
    setSuccessMessage(message)
  }

  const handleLoginError = (message: string) => {
    setErrorMessage(message)
  }

  const handleLoading = (message: boolean) => {
    setIsloadingMessage(message)
  }

  const handleRegister = async (data: RegisterDataForm) => {
    try {
      const token = await getReCaptchaToken('register_user')

      if (!token) {
        setErrorMessage('❌ Erro ao validar reCAPTCHA. Tente novamente.')
        return
      }

      let registerData: RegisterData = {
        authProvider: 'Credentials',
        email: data.email,
        name: data.name,
        confirmPassword: data.confirmPassword,
      }
      await registerMutation.mutateAsync(registerData)
    } catch (error) {
      setErrorMessage(
        "Registration attempt failed. Make sure you're not already signed in with Google!",
      )
    }
  }

  useEffect(() => {
    if (registerMutation.isSuccess) {
      setSuccessMessage(
        '✅ Registration successful! Please check your email to verify your account.',
      )
      reset()
      const timer = setTimeout(() => router.push('/'), 3000)
      return () => clearTimeout(timer)
    }
  }, [registerMutation.isSuccess, reset, router])

  return (
    <div className="bg-[#242424] p-4 sm:p-6 rounded-lg w-full max-w-[90vw] ml-auto mr-auto mt-auto sm:max-w-md relative mx-4">
      <div className="text-center mb-6 sm:mb-8">
        <FaUserPlus className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500 mx-auto mb-3 sm:mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold text-teal-400">
          Create Account
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
      <RegisterForm
        registerMutation={registerMutation}
        register={register}
        handleSubmit={handleSubmit}
        handleRegister={handleRegister}
        errors={errors}
      />
      <span className="block text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors p-4">
        <GoogleLogin
          onError={handleLoginError}
          onSuccess={handleLoginSuccess}
          isLoading={handleLoading}
        />
      </span>
    </div>
  )
}
