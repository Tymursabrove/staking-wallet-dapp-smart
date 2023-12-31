import React, { useState } from "react";
import WalletTable from "./WalletTable";
import Button from "../UI/Button";

function Wallets() {
  const DefaultWallets = {
    number: 1,
    walletId: 1232222222222222222222222222,
    deposit: 123,
    currentBalance: 123,
    tokenBalance: 1111,
    withdraw: 123,
    IsStaked: 12,
    stake: 124,
    currentStake: 123,
    rewards: 123,
  };

  const [wallets, setWallets] = useState([]);

  function createWalletHandle() {
    setWallets((oldArray) => [...oldArray, DefaultWallets]);
    console.log(wallets);
  }

  return (
    <React.Fragment>
      <h1 className="wallet-title" style={{ padding: "5px" }}>
        My Wallets
      </h1>
      <div className="wallet-table-area">
        {wallets.length > 0 ? <WalletTable wallets={wallets} /> : <></>}
      </div>
      <div className="create-wallet-btn-area">
        <Button className="create-wallet-btn" onClick={createWalletHandle}>
          Create Wallet
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Wallets;
