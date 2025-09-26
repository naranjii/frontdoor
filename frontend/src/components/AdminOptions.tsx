// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correção da importação para v4+

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwt')); // Inicia com o token salvo

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


  const login = (jwt) => {
    try {
      const decodedUser = jwtDecode(jwt);
      localStorage.setItem('jwt', jwt);
      setToken(jwt);
      setUser(decodedUser);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setToken(null);
    setUser(null);
  };

  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};