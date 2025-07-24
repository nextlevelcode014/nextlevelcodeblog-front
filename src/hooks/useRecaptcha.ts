import { useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const getReCaptchaToken = useCallback(
    async (action: string) => {
      if (!executeRecaptcha) {
        return null
      }

      try {
        const token = await executeRecaptcha(action)
        return token
      } catch (error) {
        return null
      }
    },
    [executeRecaptcha],
  )

  return { getReCaptchaToken }
}
