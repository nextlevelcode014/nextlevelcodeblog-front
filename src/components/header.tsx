'use client'

import Logo from '../../public/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserEdit,
  FaKey,
} from 'react-icons/fa'
import UserMenu from './menu-user-components/menu-user'
import { useAuth } from '@/context/auth-context'
import { useState, useRef, useEffect } from 'react'
import { MdDelete } from 'react-icons/md'
import { ConfirmationModal } from './confirmation-modal'
import { UsernameUpdate, UserPasswordUpdate } from '@/types'
import { useForm } from 'react-hook-form'
import { changePasswordSchema, changeUsernameSchema } from '@/services/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserChangeModal } from './menu-user-components/user-change-modal'
import { PasswordChangeModal } from './menu-user-components/password-change-modal'
import {
  useDeleteUserMutation,
  usePasswordMutation,
  useUsernameMutation,
} from '@/services/muations'

export const Header = () => {
  const pathname = usePathname()
  const { isAuthenticated, logout, query } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<
    'delete' | 'password' | 'username' | 'logout' | null
  >(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const usernameForm = useForm<UsernameUpdate>({
    resolver: zodResolver(changeUsernameSchema),
    mode: 'onBlur',
  })

  const passwordForm = useForm<UserPasswordUpdate>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onBlur',
  })

  const deleteMutation = useDeleteUserMutation()

  const usernameMutation = useUsernameMutation()

  const passwordMutation = usePasswordMutation()

  const handleConfirmAction = () => {
    if (activeModal === 'delete' && query.data?.data.user.id) {
      deleteMutation.mutate(query.data.data.user.id)
    } else if (activeModal === 'logout') {
      logout()
    }
  }

  const handleUsernameSubmit = (data: UsernameUpdate) => {
    usernameMutation.mutate(data)
  }

  const handlePasswordSubmit = (data: UserPasswordUpdate) => {
    passwordMutation.mutate(data)
  }

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      logout()
      setIsMenuOpen(false)
      deleteMutation.reset()
    }
  }, [deleteMutation.isSuccess, logout, deleteMutation])

  useEffect(() => {
    if (usernameMutation.isSuccess) {
      setActiveModal(null)
      query.refetch()
      usernameForm.reset()
      setIsMenuOpen(false)
      usernameMutation.reset()
    }
  }, [usernameMutation.isSuccess, query, usernameForm, usernameMutation])

  useEffect(() => {
    if (passwordMutation.isSuccess) {
      setActiveModal(null)
      query.refetch()
      passwordForm.reset()
      setIsMenuOpen(false)
      passwordMutation.reset()
    }
  }, [passwordMutation.isSuccess, query, passwordForm, passwordMutation])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header className="bg-[#0f0f0f] p-4 shadow-md border-b-2 border-gray-800">
      <nav
        className="max-w-6xl mx-auto flex justify-between items-center"
        ref={menuRef}
      >
        <div className="flex items-center gap-1">
          <Image
            src={Logo}
            alt="Logo Image"
            width={40}
            height={40}
            className="rounded-full md:w-12 md:h-12"
            priority
          />
          <div className="text-lg md:text-xl font-bold text-gray-200">
            Next Level Code
          </div>
        </div>

        <ul className="hidden md:flex gap-4 list-none">
          <li>
            <Link
              href="/"
              className={`flex items-center transition-all ${
                pathname === '/'
                  ? 'text-blue-400 font-bold'
                  : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              <FaHome className="mr-1 h-5 w-5" />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/news/posts"
              className={`flex items-center transition-all ${
                pathname === '/news/posts' || pathname === '/news/videos'
                  ? 'text-blue-400 font-bold'
                  : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              News 📰
            </Link>
          </li>
          <li>
            <Link
              href="/feed"
              className={`flex items-center transition-all ${
                pathname === '/feed'
                  ? 'text-blue-400 font-bold'
                  : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              Feed 📢
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`flex items-center transition-all ${
                pathname === '/about'
                  ? 'text-blue-400 font-bold'
                  : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              About ℹ️
            </Link>
          </li>

          {isAuthenticated ? (
            <li className="flex items-center gap-6 border-l border-gray-700 pl-4">
              <UserMenu />
            </li>
          ) : (
            <li className="flex items-center gap-6 border-l border-gray-700 pl-4">
              <Link
                href="/auth/login"
                className={`flex items-center gap-2 transition-all ${
                  pathname === '/auth/login'
                    ? 'text-blue-400 font-bold'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                <FaSignInAlt className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/auth/register"
                className={`flex items-center gap-2 transition-all ${
                  pathname === '/auth/register'
                    ? 'text-blue-400 font-bold'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                <FaUserPlus className="w-4 h-4" />
                Registrar
              </Link>
            </li>
          )}
        </ul>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-blue-400 p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50">
            <div className="absolute right-0 top-0 h-full w-3/4 bg-[#0f0f0f] p-6 border-l border-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-blue-400 p-2 transition-colors"
                aria-label="Close menu"
              >
                <FaTimes className="w-7 h-7" />
              </button>

              <ul className="flex flex-col gap-4 h-full pt-16 overflow-y-auto">
                <li>
                  <Link
                    href="/"
                    className={`flex items-center w-full gap-4 py-2 px-4 rounded-lg transition-colors duration-200 ${
                      pathname === '/'
                        ? 'bg-blue-400/10 text-blue-400 font-semibold'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-blue-400'
                    }`}
                  >
                    <FaHome className="w-6 h-6 flex-shrink-0" />
                    <span className="text-lg">Home</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/news/posts"
                    className={`flex items-center w-full gap-4 py-2 px-4 rounded-lg transition-colors duration-200 ${
                      pathname.startsWith('/news')
                        ? 'bg-blue-400/10 text-blue-400 font-semibold'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-blue-400'
                    }`}
                  >
                    <span className="text-lg">News</span>
                    <span className="text-sm">📰</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/feed"
                    className={`flex items-center w-full gap-4 py-2 px-4 rounded-lg transition-colors duration-200 ${
                      pathname === '/feed'
                        ? 'bg-blue-400/10 text-blue-400 font-semibold'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-blue-400'
                    }`}
                  >
                    <span className="text-lg">Feed</span>
                    <span className="text-sm">📢</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className={`flex items-center w-full gap-4 py-2 px-4 rounded-lg transition-colors duration-200 ${
                      pathname === '/about'
                        ? 'bg-blue-400/10 text-blue-400 font-semibold'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-blue-400'
                    }`}
                  >
                    <span className="text-lg">About</span>
                    <span className="text-sm">ℹ️</span>
                  </Link>
                </li>

                {isAuthenticated ? (
                  <>
                    <div className="border-t border-gray-800 mt-4 pt-4 space-y-3">
                      <li>
                        <button
                          onClick={() => {
                            setActiveModal('logout')
                            setIsMenuOpen(false)
                          }}
                          className="w-full flex items-center gap-4 py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-blue-400 transition-colors duration-200"
                        >
                          <FaSignOutAlt className="w-6 h-6" />
                          <span className="text-lg">Logout</span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => {
                            setActiveModal('delete')
                            setIsMenuOpen(false)
                          }}
                          className="w-full flex items-center gap-4 py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-red-400 transition-colors duration-200"
                        >
                          <MdDelete className="w-6 h-6" />
                          <span className="text-lg">Delete Account</span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => {
                            setActiveModal('password')
                            setIsMenuOpen(false)
                          }}
                          className="w-full flex items-center gap-4 py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-blue-400 transition-colors duration-200"
                        >
                          <FaKey className="w-6 h-6" />
                          <span className="text-lg">Change Password</span>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() => {
                            setActiveModal('username')
                            setIsMenuOpen(false)
                          }}
                          className="w-full flex items-center gap-4 py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-blue-400 transition-colors duration-200"
                        >
                          <FaUserEdit className="w-6 h-6" />
                          <span className="text-lg">Change name</span>
                        </button>
                      </li>
                    </div>
                  </>
                ) : (
                  <div className="border-t border-gray-800 mt-4 pt-4 space-y-3">
                    <li>
                      <Link
                        href="/auth/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-blue-400 transition-colors duration-200"
                      >
                        <FaSignInAlt className="w-6 h-6" />
                        <span className="text-lg">Login</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/auth/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 py-2 px-4 rounded-lg text-gray-300 hover:bg-gray-800/50 hover:text-blue-400 transition-colors duration-200"
                      >
                        <FaUserPlus className="w-6 h-6" />
                        <span className="text-lg">Register</span>
                      </Link>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
        )}

        <ConfirmationModal
          isOpen={activeModal === 'delete' || activeModal === 'logout'}
          title={activeModal === 'delete' ? 'Delete Account' : 'Confirm Logout'}
          message={
            activeModal === 'delete'
              ? 'Are you sure you want to permanently delete your account? This action cannot be undone.'
              : 'Are you sure you want to logout?'
          }
          onConfirm={handleConfirmAction}
          onCancel={() => setActiveModal(null)}
          isLoading={deleteMutation.isPending}
        />

        <UserChangeModal
          isOpen={activeModal === 'username'}
          onClose={() => setActiveModal(null)}
          onSubmit={usernameForm.handleSubmit(handleUsernameSubmit)}
          form={usernameForm}
          isLoading={usernameMutation.isPending}
          messageError={usernameMutation.error}
        />

        <PasswordChangeModal
          isOpen={activeModal === 'password'}
          onClose={() => setActiveModal(null)}
          onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
          form={passwordForm}
          isLoading={passwordMutation.isPending}
          messageError={passwordMutation.error}
        />
      </nav>
    </header>
  )
}
