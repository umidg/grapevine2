import React, { useState } from 'react';

export const RegisterData = React.createContext(null);

const RegisterContext = ({ children }) => {
  const [register, setRegister] = useState({ data: true, interests: [] });

  const registerMemo = React.useMemo(() => [register, setRegister], [register]);
  return (
    <RegisterData.Provider value={registerMemo}>
      {children}
    </RegisterData.Provider>
  );
};

export default RegisterContext;
