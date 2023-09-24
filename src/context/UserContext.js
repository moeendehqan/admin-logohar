import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // در اینجا اطلاعات کاربر از Local Storage خوانده می‌شود (اگر وجود داشته باشد)
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // اطلاعات کاربر را در Local Storage ذخیره کنید
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // اطلاعات کاربر را از Local Storage حذف کنید
    localStorage.removeItem('userData');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
