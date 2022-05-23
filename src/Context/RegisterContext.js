import React, { useState, useEffect } from "react";
export const RegisterData = React.createContext(null);

const RegisterContext = (props) => {
  const [data, setData] = useState({ data: true, intrests: [] });

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  return (
    <RegisterData.Provider value={[data, setData]}>
      {props.children}
    </RegisterData.Provider>
  );
};

export default RegisterContext;
