import { RegisterData } from '@/types'
import { UseMutationResult } from '@tanstack/react-query'
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'

interface RegisterFormProps {
  handleSubmit: UseFormHandleSubmit<RegisterData, undefined>
  handleRegister: (data: RegisterData) => void
  register: UseFormRegister<RegisterData>
  errors: FieldErrors<RegisterData>
  registerMutation: UseMutationResult<void, Error, RegisterData, unknown>
}
export default function RegisterForm({
  registerMutation,
  register,
  handleSubmit,
  handleRegister,
  errors,
}: RegisterFormProps) {
  return (
    <form
      className="space-y-4 sm:space-y-6"
      onSubmit={handleSubmit(handleRegister)}
    >
      <div className="relative">
        <FaUser className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
        <input
          {...register('name')}
          placeholder="Full Name"
          autoComplete="name"
          disabled={registerMutation.isPending}
          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500"
        />
        {errors.name && (
          <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="relative">
        <FaEnvelope className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
        <input
          type="email"
          {...register('email')}
          placeholder="Email Address"
          autoComplete="email"
          disabled={registerMutation.isPending}
          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500"
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
          autoComplete="new-password"
          disabled={registerMutation.isPending}
          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500"
        />
        {errors.password && (
          <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="relative">
        <FaLock className="absolute top-3.5 left-3 text-gray-400 text-sm sm:text-base" />
        <input
          type="password"
          {...register('confirmPassword')}
          placeholder="Confirm Password"
          autoComplete="new-password"
          disabled={registerMutation.isPending}
          className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base bg-[#1a1a1a] rounded-lg focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-500"
        />
        {errors.confirmPassword && (
          <p className="text-xs sm:text-sm text-red-500 mt-1 ml-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        {registerMutation.isPending ? 'Creating Account...' : 'Register Now'}
      </button>
    </form>
  )
}
