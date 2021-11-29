import { createContext, useEffect, useState } from 'react';
import AuthService from './AuthService';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(async () => {
    setLoggedIn(!!AuthService.getCurrentUser());
  })

  return(
    <AuthContext.Provider value = {{token, setToken, loggedIn}}>
      {children}
    </AuthContext.Provider>
  )
}
