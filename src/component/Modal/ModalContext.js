import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    console.log("Toggle modal:", !isModalOpen); 
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, handleModalToggle }}>
      {children}
    </ModalContext.Provider>
  );
};
