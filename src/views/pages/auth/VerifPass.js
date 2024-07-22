// VerifPassContext.js
import React, { createContext, useContext, useState } from "react";

const VerifPassContext = createContext();

export const VerifPassProvider = ({ children }) => {
  const [requirePassword, setRequirePassword] = useState(false);
  const [verifikasiPassword, setVeri] = useState([]);

  return (
    <VerifPassContext.Provider
      value={{
        requirePassword,
        setRequirePassword,
        verifikasiPassword,
        setVeri,
      }}>
      {children}
    </VerifPassContext.Provider>
  );
};

export const usePasswordVerification = () => useContext(VerifPassContext);
