import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { DialogFooter, DialogHeader } from '../ui/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { Button } from '../ui/button'
import { FormEvent, useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function VerifyOtp({ email }: { email: string }) {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [isLoading, setIsLoading] = useState(false)
  const [verifyError, setVerifyError] = useState('')
  const [code, setCode] = useState('')
  const router = useRouter()

  // Handle the submission of the verification form
  const handleVerify = async (e: FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.push('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setIsLoading(false)
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      setVerifyError((err as Error).message)
      console.error('Error:', JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className='text-center'>Verify your account</DialogTitle>
        <DialogDescription className='text-center'>
          Enter the verification code sent to your email:
          {email}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleVerify}>
        <div className='flex flex-col items-center my-4'>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={code}
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className={`${
                  verifyError ? 'border-red-500 focus-visible:ring-red-500' : ''
                } `}
              />
              <InputOTPSlot
                index={1}
                className={`${
                  verifyError ? 'border-red-500 focus-visible:ring-red-500' : ''
                } `}
              />
              <InputOTPSlot
                index={2}
                className={`${
                  verifyError ? 'border-red-500 focus-visible:ring-red-500' : ''
                } `}
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot
                index={3}
                className={`${
                  verifyError ? 'border-red-500 focus-visible:ring-red-500' : ''
                } `}
              />
              <InputOTPSlot
                index={4}
                className={`${
                  verifyError ? 'border-red-500 focus-visible:ring-red-500' : ''
                } `}
              />
              <InputOTPSlot
                index={5}
                className={`${
                  verifyError ? 'border-red-500 focus-visible:ring-red-500' : ''
                } `}
              />
            </InputOTPGroup>
          </InputOTP>
          {verifyError && (
            <p className='text-sm text-red-500 mt-2 flex gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
                className='cl-internal-1sany6l'
                width='30'
                height='30'
              >
                <path
                  fill='currentColor'
                  fillRule='evenodd'
                  d='M13.4 7A6.4 6.4 0 1 1 .6 7a6.4 6.4 0 0 1 12.8 0Zm-5.6 3.2a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0ZM7 3a.8.8 0 0 0-.8.8V7a.8.8 0 0 0 1.6 0V3.8A.8.8 0 0 0 7 3Z'
                  clipRule='evenodd'
                ></path>
              </svg>
              {verifyError}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            type='submit'
            className='w-full'
            disabled={isLoading || code.length !== 6 ? true : false}
          >
            {isLoading ? (
              <svg width='80' height='80' viewBox='0 0 50 50'>
                <circle
                  cx='25'
                  cy='25'
                  r='20'
                  fill='none'
                  stroke='#60A5FA'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeDasharray='60 120'
                >
                  <animateTransform
                    attributeName='transform'
                    type='rotate'
                    from='0 25 25'
                    to='360 25 25'
                    dur='1s'
                    repeatCount='indefinite'
                  ></animateTransform>
                </circle>
              </svg>
            ) : (
              'Verify OTP'
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

export default VerifyOtp
