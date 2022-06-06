import React, { useState } from 'react';

export const ThemeValue = React.createContext(null);
const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const value = React.useMemo(() => [theme, setTheme], [theme]);
  return <ThemeValue.Provider value={value}>{children}</ThemeValue.Provider>;
};

export default ThemeContext;
