import Link from 'next/link'
import './globals.css'
import { Metadata } from 'next'
import Provider from '@/services/provider'
import { ReactNode } from 'react'
import { AuthProvider } from '@/context/auth-context'
import { Header } from '@/components/header'
import ReCaptchaProvider from '@/components/recaptcha/RecaptchaProvider'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'NextLevelCodeBlog',
  description: 'Next Level Code Blog sobre Linux, programação e Bitcoin',
  openGraph: {
    title: 'NextLevelCodeBlog',
    description: 'Blog educacional sobre Linux, programação e Bitcoin',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-black">
        <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-gray-100">
          <ReCaptchaProvider>
            <Provider>
              <AuthProvider>
                <Header />
                {children}
              </AuthProvider>
            </Provider>
          </ReCaptchaProvider>
          <Footer />
        </div>
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-100 text-center p-4 mt-auto border-t border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Link
            href="mailto:nextlevelcode014@gmail.com"
            className="text-gray-400 hover:text-gray-200 transition duration-200"
          >
            nextlevelcode014@gmail.com
          </Link>
          <Link
            href="https://github.com/nextlevelcode014"
            target="_blank"
            className="text-gray-400 hover:text-gray-200 transition duration-200"
          >
            github.com/nextlevelcode014
          </Link>
        </nav>
        <p className="text-gray-400">&copy; 2024 NextLevelCodeBlog.</p>
      </div>
    </footer>
  )
}
