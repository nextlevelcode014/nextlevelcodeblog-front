'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'

interface GoogleLoginProps {
  onSuccess: (user: any) => void
  onError: (error: string) => void
  isLoading: (value: boolean) => void
}

declare global {
  interface Window {
    google: any
  }
}

export default function GoogleLogin({
  onSuccess,
  onError,
  isLoading,
}: GoogleLoginProps) {
  let { login } = useAuth()

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        })

        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            width: 250,
          },
        )
      }
    }

    if (window.google) {
      initializeGoogleSignIn()
    } else {
      const checkGoogle = setInterval(() => {
        if (window.google) {
          initializeGoogleSignIn()
          clearInterval(checkGoogle)
        }
      }, 100)
    }
  }, [])

  const handleCredentialResponse = async (response: any) => {
    isLoading(true)

    try {
      JSON.parse(atob(response.credential.split('.')[1]))

      const backendResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: response.credential,
          }),
        },
      )

      const result = await backendResponse.json()

      if (result.success) {
        login(result.jwt_token)
        onSuccess(result.message)
      } else {
        onError('Authentication failed!')
      }
    } catch (error) {
      onError('Authentication error!')
    } finally {
      isLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div id="google-signin-button"></div>
    </div>
  )
}
