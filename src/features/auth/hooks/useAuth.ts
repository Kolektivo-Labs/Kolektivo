import { AuthContext } from '@/components/auth/AuthProvider'
import { useContext } from 'react'

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }

  return { ...context, isLogged: context.user !== null }
}
