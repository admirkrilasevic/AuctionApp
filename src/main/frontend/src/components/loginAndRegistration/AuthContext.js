import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const[token, setToken] = useState(null);
  let loggedIn = false;
  if (token) {
    loggedIn = true;
  }
  return(
    <AuthContext.Provider value = {{token, setToken, loggedIn}}>
      {children}
    </AuthContext.Provider>
  )
}
