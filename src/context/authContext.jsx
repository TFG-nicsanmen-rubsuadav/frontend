import { createContext, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  // LOGICA DE AUTENTICACION
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("access_token") ?? false
  );

  // LOGICA DE ROLES
  const [role, setRole] = useState(
    localStorage.getItem("role") ?? {
      admin: false,
      authorized: false,
      owner: false,
      customer: false,
    }
  );

  const { admin, authorized, owner, customer } = role;

  // FUNCIONES DE AUTENTICACION
  const login = useCallback((token, role) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("role", role);
    setRole(role);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("sessionId");
    setRole({
      admin: false,
      authorized: false,
      owner: false,
      customer: false,
    });
    setIsAuthenticated(false);
  }, []);

  // PROVEER EL CONTEXTO
  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      admin,
      authorized,
      owner,
      customer,
    }),
    [isAuthenticated, login, logout, admin, authorized, owner, customer]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};
