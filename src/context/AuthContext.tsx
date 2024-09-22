import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of the context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to wrap the app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Simulate login process
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de uma requisição de login (poderia ser uma chamada de API)
    if (password === '1234') {
      // Exemplo: Armazenar token no localStorage
      localStorage.setItem('authToken', 'fake-token');
      setIsAuthenticated(true);
      navigate('/loggedin');
      return true;
    } else {
      return false;
    }
  };

  // Função de logout
  const logout = () => {
    // Remove o token de autenticação
    localStorage.removeItem('authToken');
    // Atualiza o estado de autenticação
    setIsAuthenticated(false);
    // Redireciona o usuário para a tela de login
    navigate('/login');
  };

  // Checar se o usuário já está autenticado ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
