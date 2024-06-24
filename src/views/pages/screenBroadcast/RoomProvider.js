// RoomProvider.js
import React, { createContext, useContext, useState } from "react";

const RoomContext = createContext();

export const useRoom = () => {
  return useContext(RoomContext);
};

export const RoomProvider = ({ children }) => {
  const [fetchedKodeRuang, setFetchedKodeRuang] = useState("");

  return (
    <RoomContext.Provider value={{ fetchedKodeRuang, setFetchedKodeRuang }}>
      {children}
    </RoomContext.Provider>
  );
};
