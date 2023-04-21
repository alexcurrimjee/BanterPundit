import { useContext, createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, loading] = useAuthState(auth);
  const value = { user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
