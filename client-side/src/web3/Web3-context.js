import React from "react";

const Web3Context = React.createContext({
  isConnected: false,
  address: undefined,
  balance: undefined,

  walletConnect: () => {},
  disconnectWallet: () => {},
});

export default Web3Context;
