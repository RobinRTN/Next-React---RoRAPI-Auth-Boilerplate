import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    userId: null,
    userEmail: null,
    username: null,
    userPicture: null
  });

  // Initialize state from localStorage
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const username = localStorage.getItem('username');
    const userPicture = localStorage.getItem('userPicture');

    if (accessToken && userId && userEmail) {
      setAuthState({
        accessToken,
        userId,
        userEmail,
        userPicture,
        username,
      });
    }
  }, []);

  const updateAuth = (newAuthState) => {
    localStorage.setItem('accessToken', newAuthState.accessToken);
    localStorage.setItem('userId', newAuthState.userId);
    localStorage.setItem('userEmail', newAuthState.userEmail);
    setAuthState(newAuthState);
  };

  const updateUsername = (newUsername) => {
    localStorage.setItem('username', newUsername);
    setAuthState({ ...authState, username: newUsername });
  }

  const clearAuth = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPicture');
    localStorage.removeItem('username');
    setAuthState({});
  };

  return (
    <AuthContext.Provider value={{ authState, updateAuth, updateUsername, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
