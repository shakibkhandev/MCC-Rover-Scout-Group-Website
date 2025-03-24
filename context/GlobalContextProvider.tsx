"use client";
import React, { useEffect, useState } from "react";

interface GlobalProviderProps {
  children?: React.ReactNode;
}

interface GlobalContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const GlobalContext = React.createContext<GlobalContextProps | null>(null);

export const useGlobalContext = () => {
  const state = React.useContext(GlobalContext);
  if (!state) throw new Error("State Is Undefined");

  return state;
};

export const GlobalContextProvider: React.FC<GlobalProviderProps> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("dark-theme", (!isDarkMode).toString());
  };

  useEffect(() => {
    const theme = localStorage.getItem("dark-theme");
    if (theme === "true") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};
