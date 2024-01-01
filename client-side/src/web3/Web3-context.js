import React from "react";

const Web3Context = React.createContext({
  isConnected: false,
  address: undefined,
  balance: undefined,

  getWallets: undefined,

  getCurrentRewards: () => {},
  getCurrentStake: () => {},
  getIsStake: () => {},
  getAETBalance: () => {},
  getWalletBalance: () => {},
  walletConnect: () => {},
  disconnectWallet: () => {},
});

export default Web3Context;
