import { useState } from 'react'
import SignInForm from './sign-in'
import SignUpForm from './sign-up'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

function AuthDialog() {
  const [authAction, setAuthAction] = useState('sign-in')

  const resetAuthAction = () => {
    if (authAction === 'sign-up') setAuthAction('sign-in')
  }

  return (
    <Dialog onOpenChange={resetAuthAction}>
      <DialogTrigger asChild>
        <Button className='text-sm text-white border-indigo-300 border-[1px]  bg-gradient-to-b from-indigo-400 to-indigo-600 rounded-md py-1 px-3 active:scale-95'>
          Sign in
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        {authAction === 'sign-in' ? (
          <SignInForm
            onAuthActionChange={(action: string) => setAuthAction(action)}
          />
        ) : (
          <SignUpForm
            onAuthActionChange={(action: string) => setAuthAction(action)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
