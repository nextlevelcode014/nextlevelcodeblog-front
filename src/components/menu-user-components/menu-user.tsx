'use client'

import { useAuth } from '@/context/auth-context'
import {
  changePasswordSchema,
  changeUsernameSchema,
  deleteUserSchema,
} from '@/services/schemas'
import { DeleteUser, UsernameUpdate, UserPasswordUpdate } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaKey, FaSignOutAlt, FaUserCircle, FaUserEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { ConfirmationModal } from '../confirmation-modal'
import { UserChangeModal } from './user-change-modal'
import { PasswordChangeModal } from './password-change-modal'
import { MenuItem } from './menu-item'
import {
  useDeletegoogleUserMutation,
  useDeleteUserMutation,
  usePasswordMutation,
  useUsernameMutation,
} from '@/services/muations'
import { DeleteUserChangeModel } from './delete-user-change-model'

export default function UserMenu() {
  const { isAuthenticated, logout, query } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<
    'delete' | 'password' | 'username' | 'logout' | null
  >(null)
  const user = query.data
  const menuRef = useRef<HTMLDivElement>(null)

  const usernameForm = useForm<UsernameUpdate>({
    resolver: zodResolver(changeUsernameSchema),
    mode: 'onBlur',
  })

  const passwordForm = useForm<UserPasswordUpdate>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onBlur',
  })

  const deleteUserForm = useForm<DeleteUser>({
    resolver: zodResolver(deleteUserSchema),
    mode: 'onBlur',
  })

  const deleteUserMutation = useDeleteUserMutation()
  const deleteGoogleUserMutation = useDeletegoogleUserMutation()
  const usernameMutation = useUsernameMutation()
  const passwordMutation = usePasswordMutation()

  useEffect(() => {
    if (deleteUserMutation.isSuccess) {
      logout()
      deleteUserMutation.reset()
    }
  }, [deleteUserMutation.isSuccess, logout, deleteUserMutation])

  useEffect(() => {
    if (deleteGoogleUserMutation.isSuccess) {
      logout()
      deleteGoogleUserMutation.reset()
    }
  }, [deleteGoogleUserMutation.isSuccess, logout, deleteGoogleUserMutation])

  useEffect(() => {
    if (usernameMutation.isSuccess) {
      setActiveModal(null)
      usernameForm.reset()
      usernameMutation.reset()
      query.refetch()
    }
  }, [usernameMutation.isSuccess, usernameForm, usernameMutation])

  useEffect(() => {
    if (passwordMutation.isSuccess) {
      setActiveModal(null)
      passwordForm.reset()
      passwordMutation.reset()
    }
  }, [passwordMutation.isSuccess, passwordForm, passwordMutation])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDeletUserSubmit = (password: DeleteUser) => {
    deleteUserMutation.mutate(password.password)
  }

  const handleUsernameSubmit = (data: UsernameUpdate) => {
    usernameMutation.mutate(data)
  }

  const handlePasswordSubmit = (data: UserPasswordUpdate) => {
    passwordMutation.mutate(data)
  }

  const handleConfirmAction = () => {
    if (
      activeModal === 'delete' &&
      user?.data.user.id &&
      user?.data.user.authProvider === 'Google'
    ) {
      deleteGoogleUserMutation.mutate()
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-label="User menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
      >
        <FaUserCircle className="w-6 h-6" />
        {user?.data.user.name}
      </button>

      {isMenuOpen && isAuthenticated && (
        <div className="absolute right-0 mt-2 w-52 bg-[#242424] rounded-lg shadow-lg z-50">
          <ul className="py-2">
            <MenuItem
              icon={<FaSignOutAlt />}
              label="Logout"
              onClick={() => setActiveModal('logout')}
            />
            <MenuItem
              icon={<MdDelete />}
              label="Delete Account"
              onClick={() => setActiveModal('delete')}
            />

            {user?.data.user.authProvider !== 'Google' && (
              <MenuItem
                icon={<FaKey />}
                label="Change Password"
                onClick={() => setActiveModal('password')}
              />
            )}

            {user?.data.user.authProvider !== 'Google' && (
              <MenuItem
                icon={<FaUserEdit />}
                label="Change Username"
                onClick={() => setActiveModal('username')}
              />
            )}
          </ul>
        </div>
      )}

      <ConfirmationModal
        isOpen={
          (activeModal === 'delete' &&
            user?.data.user.authProvider === 'Google') ||
          activeModal === 'logout'
        }
        title={
          activeModal === 'delete' && user?.data.user.authProvider === 'Google'
            ? 'Delete Account'
            : 'Confirm Logout'
        }
        message={
          activeModal === 'delete' && user?.data.user.authProvider === 'Google'
            ? 'Are you sure you want to permanently delete your account? This action cannot be undone.'
            : 'Are you sure you want to logout?'
        }
        apiMessage={deleteUserMutation.error?.message}
        onConfirm={
          activeModal === 'delete' && user?.data.user.authProvider === 'Google'
            ? handleConfirmAction
            : logout
        }
        onCancel={() => setActiveModal(null)}
        isLoading={deleteGoogleUserMutation.isPending}
      />

      {user?.data.user.authProvider !== 'Google' && (
        <DeleteUserChangeModel
          isOpen={activeModal === 'delete'}
          onClose={() => setActiveModal(null)}
          form={deleteUserForm}
          isLoading={deleteUserMutation.isPending}
          messageError={usernameMutation.error}
          onSubmit={deleteUserForm.handleSubmit(handleDeletUserSubmit)}
        />
      )}
      {user?.data.user.authProvider !== 'Google' && (
        <UserChangeModal
          isOpen={activeModal === 'username'}
          onClose={() => setActiveModal(null)}
          onSubmit={usernameForm.handleSubmit(handleUsernameSubmit)}
          form={usernameForm}
          isLoading={usernameMutation.isPending}
          messageError={usernameMutation.error}
        />
      )}

      {user?.data.user.authProvider !== 'Google' && (
        <PasswordChangeModal
          isOpen={activeModal === 'password'}
          onClose={() => setActiveModal(null)}
          onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
          form={passwordForm}
          isLoading={passwordMutation.isPending}
          messageError={passwordMutation.error}
        />
      )}
    </div>
  )
}
