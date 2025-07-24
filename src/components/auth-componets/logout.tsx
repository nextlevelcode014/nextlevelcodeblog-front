'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'

export default function LogoutButton() {
  const { logout } = useAuth()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <button
        className="flex items-center gap-2 text-gray-400 transition-all hover:text-blue-400"
        onClick={() => setShowConfirm(true)}
      >
        Logout
      </button>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#0f0f0f] p-6 rounded-lg shadow-md text-white">
            <p className="mb-4 text-lg">Tem certeza que deseja sair?</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
                onClick={handleLogout}
              >
                Sim, sair
              </button>
              <button
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded text-white"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
