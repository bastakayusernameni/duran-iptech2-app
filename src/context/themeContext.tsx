import React, { createContext, useContext, useMemo, useState } from 'react';
import { getAppStyles } from '../components/appstyle';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  styles: ReturnType<typeof getAppStyles>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const styles = useMemo(() => getAppStyles(isDarkMode), [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, styles }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}