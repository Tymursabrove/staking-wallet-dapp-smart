import React, { useContext } from "react";

import Web3Context from "../web3/Web3-context";
import { Button } from "bootstrap";

function WalletConnectBtn() {
  const web3Ctx = useContext(Web3Context);

  return <button onClick={web3Ctx.walletConnect}>Click</button>;
}

export default WalletConnectBtn;
