import { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
  uid: string;
}

interface AuthContextType {
  user: null | User; // Assuming `User` is a type you have defined elsewhere
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // onAuthStateChanged
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 3000);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // signInWithEmailAndPassword
    } catch (error) {}
  };

  const register = async (email: string, password: string) => {
    try {
      // createUserWithEmailAndPassword
    } catch (error) {}
  };

  const logout = async () => {
    try {
      // signOut
    } catch (error) {}
  };

  const value = { user, isAuthenticated, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return value;
};
