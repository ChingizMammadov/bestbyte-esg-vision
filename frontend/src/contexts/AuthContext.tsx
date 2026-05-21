import React, { createContext, useContext } from 'react'
import { useUser, useSignIn, useSignUp, useClerk } from '@clerk/clerk-react'

export interface AppUser {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
}

interface AuthContextType {
  user: AppUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  getToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const NO_CLERK_VALUE: AuthContextType = {
  user: null,
  loading: false,
  signIn: async () => ({
    error: { message: 'Add VITE_CLERK_PUBLISHABLE_KEY to frontend/.env.local' },
  }),
  signUp: async () => ({
    error: { message: 'Add VITE_CLERK_PUBLISHABLE_KEY to frontend/.env.local' },
  }),
  signOut: async () => {},
  getToken: async () => null,
}

function ClerkAuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded: userLoaded, isSignedIn, user: clerkUser } = useUser()
  const { isLoaded: signInLoaded, signIn: clerkSignIn, setActive: setSignInActive } = useSignIn()
  const { isLoaded: signUpLoaded, signUp: clerkSignUp, setActive: setSignUpActive } = useSignUp()
  const { signOut: clerkSignOut, session } = useClerk()

  const user: AppUser | null =
    userLoaded && isSignedIn && clerkUser
      ? {
          id: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress ?? '',
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
        }
      : null

  const signIn = async (email: string, password: string): Promise<{ error: any }> => {
    if (!signInLoaded) return { error: { message: 'Auth is still loading' } }
    try {
      const result = await clerkSignIn.create({ identifier: email, password })
      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId })
        return { error: null }
      }
      return { error: { message: 'Sign in requires additional verification' } }
    } catch (err: any) {
      return {
        error: {
          message:
            err?.errors?.[0]?.longMessage ??
            err?.errors?.[0]?.message ??
            err?.message ??
            'Sign in failed',
        },
      }
    }
  }

  const signUp = async (email: string, password: string): Promise<{ error: any }> => {
    if (!signUpLoaded) return { error: { message: 'Auth is still loading' } }
    try {
      const result = await clerkSignUp.create({ emailAddress: email, password })
      if (result.status === 'complete') {
        await setSignUpActive({ session: result.createdSessionId })
        return { error: null }
      }
      // Email verification required — send a magic link
      await clerkSignUp.prepareEmailAddressVerification({
        strategy: 'email_link',
        redirectUrl: `${window.location.origin}/dashboard`,
      })
      return { error: { message: 'EMAIL_VERIFICATION_REQUIRED' } }
    } catch (err: any) {
      return {
        error: {
          message:
            err?.errors?.[0]?.longMessage ??
            err?.errors?.[0]?.message ??
            err?.message ??
            'Sign up failed',
        },
      }
    }
  }

  const signOut = async () => {
    await clerkSignOut()
  }

  const getToken = async (): Promise<string | null> => {
    if (!session) return null
    return session.getToken()
  }

  return (
    <AuthContext.Provider value={{ user, loading: !userLoaded, signIn, signUp, signOut, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

function FallbackAuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={NO_CLERK_VALUE}>{children}</AuthContext.Provider>
}

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (CLERK_KEY) {
    return <ClerkAuthProvider>{children}</ClerkAuthProvider>
  }
  return <FallbackAuthProvider>{children}</FallbackAuthProvider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
