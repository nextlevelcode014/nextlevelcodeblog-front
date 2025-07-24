import Loading from '@/components/loading'
import VerifyEmail from '@/components/auth-componets/verify-email'
import { Suspense } from 'react'

export default function ResetPasswordWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmail />
    </Suspense>
  )
}
