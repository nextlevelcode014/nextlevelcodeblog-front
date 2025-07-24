import Loading from '@/components/loading'
import ResetPasswordPage from '@/components/auth-componets/reset-password'
import { Suspense } from 'react'

export default function ResetPasswordWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordPage />
    </Suspense>
  )
}
