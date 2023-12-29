import React, { useContext } from "react";
import Web3Context from "../web3/Web3-context";

import MustConnect from "./MustConnect";
import WalletInfo from "./WalletInfo";
import Wallets from "./Wallets";

function MainArea() {
  const web3Ctx = useContext(Web3Context);

  return (
    <React.Fragment>
      {web3Ctx.isConnected ? (
        <div className="main-area">
          <WalletInfo />
          <Wallets />
        </div>
      ) : (
        <MustConnect />
      )}
    </React.Fragment>
  );
}

export default MainArea;
