import React, { useState, useContext, useEffect } from "react";
import Web3Context from "../web3/Web3-context";
import WalletTable from "./WalletTable";
import Button from "../UI/Button";
import Spinning from "../UI/Spinning";

function Wallets() {
  const web3Ctx = useContext(Web3Context);

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

  useEffect(() => {
    setWallets([]);
    getWallets();
  }, []);

  async function getWallets() {
    const wallets = await web3Ctx.getWallets();
    const walletsArr = [];

    await wallets.map(async (item) => {
      const walletId = Number(item);

      const walletBalance = await web3Ctx.getWalletBalance(walletId);
      // get AET balance
      const isStaked = await web3Ctx.getIsStake(walletId);
      const currentStake = await web3Ctx.getCurrentStake(walletId);
      const currentReward = await web3Ctx.getCurrentRewards(walletId);
      const wallet = {
        number: walletId,
        walletId: 1232222222222222222222222222,
        deposit: 123,
        currentBalance: Number(walletBalance),
        tokenBalance: 1111,
        withdraw: 123,
        IsStaked: isStaked ? `true` : "false",
        stake: 124,
        currentStake: Number(currentStake),
        rewards: Number(currentReward),
      };

      // walletsArr.push(wallet);
      setWallets((oldArray) => [...oldArray, wallet]);
    });

    // setWallets(walletsArr);
  }

  async function createWallet() {
    await web3Ctx.createWallet.write({ from: web3Ctx.address });
    await getWallets();
  }

  function createWalletHandle() {
    createWallet();

    // setWallets((oldArray) => [...oldArray, DefaultWallets]);
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
          {web3Ctx.createWallet.isLoading ? (
            <Spinning isBtn={true} />
          ) : (
            "Create Wallet"
          )}
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Wallets;
