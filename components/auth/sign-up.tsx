'use client'

import { useSignUp } from '@clerk/nextjs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import VerifyOtp from './verify-otp'

export default function SignUpForm({
  onAuthActionChange,
}: {
  onAuthActionChange: (action: string) => void
}) {
  const { isLoaded, signUp } = useSignUp()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    if (!isLoaded) return

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress: email,
        password,
      })

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true)
    } catch (err) {
      setError((err as Error).message)
      console.error(JSON.stringify(err, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  const handleAuthChange = () => {
    onAuthActionChange('sign-in')
  }

  if (verifying) {
    return <VerifyOtp email={email} />
  }

  // Display a form to capture the user's email and password
  return (
    <>
      <DialogHeader className='mb-4'>
        <DialogTitle className='text-center'>Create your account</DialogTitle>
        <DialogDescription className='text-center'>
          Welcome! Please fill in the details to get started
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4 py-3'>
          <div>
            <label className='block mb-1 font-medium text-sm'>
              Enter email address
            </label>
            <Input
              type='email'
              required
              placeholder='Enter your email'
              value={email}
              className={`${
                error ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className='block mb-1 font-medium text-sm'>
              Enter password
            </label>
            <Input
              type='password'
              required
              placeholder='Password'
              value={password}
              className={`${
                error ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className='text-xs text-red-500 mb-2 flex gap-1'>
            {error && (
              <>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                  className='cl-internal-1sany6l'
                  width='18'
                  height='18'
                >
                  <path
                    fill='currentColor'
                    fillRule='evenodd'
                    d='M13.4 7A6.4 6.4 0 1 1 .6 7a6.4 6.4 0 0 1 12.8 0Zm-5.6 3.2a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0ZM7 3a.8.8 0 0 0-.8.8V7a.8.8 0 0 0 1.6 0V3.8A.8.8 0 0 0 7 3Z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                {error}
              </>
            )}
          </p>
        </div>
        <DialogFooter className='flex-col sm:flex-col'>
          <Button
            type='submit'
            className='w-full'
            disabled={isLoading ? true : false}
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
              'Submit'
            )}
          </Button>
          <p className='text-sm mt-3 text-center'>
            Already have an account?
            <Button onClick={handleAuthChange} variant='link' className='p-1'>
              Sign in
            </Button>
          </p>
        </DialogFooter>
      </form>
    </>
  )
}
