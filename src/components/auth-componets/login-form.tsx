import { LoginData, LoginResponse } from '@/types'
import { UseMutationResult } from '@tanstack/react-query'
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { FaLock, FaUser } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { ImSpinner8 } from 'react-icons/im'

interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<LoginData, undefined>
  handleLogin: (data: LoginData) => void
  loginMutation: UseMutationResult<LoginResponse, Error, LoginData, unknown>
  register: UseFormRegister<LoginData>
  errors: FieldErrors<LoginData>
}

export default function LoginForm({
  loginMutation,
  handleSubmit,
  handleLogin,
  register,
  errors,
}: LoginFormProps) {
  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="space-y-4 sm:space-y-6"
    >
      <div className="relative">
        <FaUser className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
        <input
          {...register('email')}
          placeholder="Email"
          type="email"
          autoComplete="email"
          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500 disabled:opacity-70"
          disabled={loginMutation.isPending}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="relative">
        <FaLock className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          autoComplete="current-password"
          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500 disabled:opacity-70"
          disabled={loginMutation.isPending}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loginMutation.isPending ? (
          <ImSpinner8 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
        {loginMutation.isPending ? 'Authenticating...' : 'Continue'}
      </button>
    </form>
  )
}
