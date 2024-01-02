import React, { useState, useContext, useEffect } from "react";
import Web3Context from "../web3/Web3-context";
import Spinning from "../UI/Spinning";
import Table from "react-bootstrap/Table";

function WalletTable() {
  const web3Ctx = useContext(Web3Context);

  useEffect(() => {
    web3Ctx.getAllWallets();
  }, []);

  return (
    <React.Fragment>
      {web3Ctx.walletsIsLoading ? (
        <Spinning />
      ) : (
        <Table bordered hover bsPrefix="my-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Wallet Adr</th>
              <th>Deposit</th>
              <th>Current Balance</th>
              <th>AET Balance</th>
              <th>Withdraw</th>
              <th>Is Staked</th>
              <th>Stake</th>
              <th>Current Stake</th>
              <th>Rewards</th>
            </tr>
          </thead>
          <tbody>
            {web3Ctx.Wallets.map((item) => {
              return (
                <tr key={item.walletId}>
                  <td>{item.number}</td>
                  <td>{item.walletId}</td>
                  <td>{item.deposit}</td>
                  <td>{item.currentBalance}</td>
                  <td>{item.tokenBalance}</td>
                  <td>{item.withdraw}</td>
                  <td>{item.IsStaked}</td>
                  <td>{item.stake}</td>
                  <td>{item.currentStake}</td>
                  <td>{item.rewards}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
}

export default WalletTable;
