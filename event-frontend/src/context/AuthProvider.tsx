import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContext'; 

export const AuthProvider = ({ children }: { children: ReactNode }) => {
 const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAdmin(false); // fetch infor
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };


  const contextValue = useMemo(() => ({ 
    token, 
    login, 
    logout, 
    isAuthenticated: !!token, 
    isAdmin 
  }), [token, isAdmin]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
