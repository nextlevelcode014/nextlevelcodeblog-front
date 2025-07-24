'use client'
import React, { ReactNode } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

interface RecaptchaProviderProps {
  children: ReactNode
}

const ReCaptchaProvider: React.FC<RecaptchaProviderProps> = ({ children }) => {
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!sitekey) {
    return <>{children}</>
  }
  return (
    <GoogleReCaptchaProvider reCaptchaKey={sitekey}>
      {children}
    </GoogleReCaptchaProvider>
  )
}

export default ReCaptchaProvider
