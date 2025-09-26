import React, { createContext, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

export type AuthContextType = {
  token: string | null;
  login: (token: string ) => void;
  logout: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Inicia com o token salvo

  // Efeito para carregar o usuário se um token já existir
  React.useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        // Token inválido ou expirado
        logout();
      }
    }
  }, [token]);


  const login = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      localStorage.setItem('token', token);
      setToken(token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
