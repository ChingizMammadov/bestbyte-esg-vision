import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn(
    '[Clerk] VITE_CLERK_PUBLISHABLE_KEY is not set. ' +
    'Create frontend/.env.local and add your key from https://dashboard.clerk.com'
  )
}

createRoot(document.getElementById("root")!).render(
  PUBLISHABLE_KEY ? (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  ) : (
    <App />
  )
)
