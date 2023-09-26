import React, { useState } from "react";

const AuthContext = React.createContext({} as any);

function AuthProvider({ children }: any) {
  const getToken = () => {
    const token: any = localStorage.getItem("token");
    return token;
  };
  const [token, setToken] = useState(getToken());
  const saveToken = (token: any) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const deleteToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const getUser = () => {
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    return user;
  };
  const [user, setUser] = useState(getUser());
  const saveUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const deleteUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const saveOnboardingStatus = (status: boolean) => {
    const user = getUser();
    if (user) {
      user.has_onboarding_completed = status;
      saveUser(user);
    }
  };

  const auth = {
    saveOnboardingStatus, // función para guardar el estado (hasOnboardingCompleted)
    setToken: saveToken,
    getToken: () => token, // Aquí está el cambio
    deleteToken,
    setUser: saveUser,
    getUser: () => user, // Y aquí
    deleteUser,
  };
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

export { AuthProvider, useAuth };
