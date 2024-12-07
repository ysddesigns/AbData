import React, { createContext, useContext, useState } from "react";

interface walletContextType {
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
}

const WalletContext = createContext<walletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletBalance, setWalletBalance] = useState(0);

  return (
    <WalletContext.Provider value={{ walletBalance, setWalletBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): walletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("use wallet must be within  a walletProvider");
  }

  return context;
};
