"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface GlobalProviderProps {
  children?: React.ReactNode;
}

interface GlobalContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  toggleLang: () => void;
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
  const locale = useLocale(); // Get the current locale
  const router = useRouter(); // For navigation
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("dark-theme", (!isDarkMode).toString());
  };

  // List of supported locales
  const supportedLocales = ["en", "bn"];

  const toggleLang = () => {
    // Find the next locale (e.g., if current is 'en', switch to 'es', and vice versa)
    const nextLocale =
      supportedLocales.find((l) => l !== locale) || supportedLocales[0];

    // Replace the current URL with the new locale
    router.push(`/${nextLocale}`, { scroll: false });
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
    <GlobalContext.Provider value={{ isDarkMode, toggleTheme, toggleLang }}>
      {children}
    </GlobalContext.Provider>
  );
};
