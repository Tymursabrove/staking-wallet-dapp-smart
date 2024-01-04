import React, { useState, useContext, useEffect } from "react";
import Web3Context from "../web3/Web3-context";
import Spinning from "../UI/Spinning";
import Table from "react-bootstrap/Table";
import Button from "../UI/Button";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";

function WalletTable() {
  const web3Ctx = useContext(Web3Context);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(0);

  useEffect(() => {
    web3Ctx.getAllWallets();
  }, []);

  function deposit(walletID) {
    setCurrentWallet(walletID);
    setShowDepositModal(true);
  }

  function withdraw(walletID) {
    setCurrentWallet(walletID);
    setShowWithdrawModal(true);
  }

  function closeModal() {
    setShowDepositModal(false);
    setShowWithdrawModal(false);
  }

  return (
    <React.Fragment>
      {web3Ctx.walletsIsLoading ? (
        <Spinning />
      ) : (
        <Table bordered hover bsPrefix="my-table">
          <thead>
            <tr
              style={{
                textAlign: "center",
              }}
            >
              <th>ID</th>
              <th>Wallet Adr</th>
              <th>Current Balance</th>
              <th>Deposit</th>
              <th>Withdraw</th>
              <th>AET Balance</th>
              <th>Is Staked</th>
              <th>Stake</th>
              <th>Current Stake</th>
              <th>Rewards</th>
            </tr>
          </thead>
          <tbody>
            {web3Ctx.Wallets.map((item) => {
              return (
                <tr
                  style={{
                    textAlign: "center",
                  }}
                  key={item.walletId}
                >
                  <td>{item.walletId}</td>
                  <td>{item.walletId}</td>
                  <td>{item.currentBalance} ETH</td>
                  <td>
                    <Button onClick={deposit.bind(null, item.walletId)}>
                      Deposit
                    </Button>
                  </td>
                  <td>
                    {" "}
                    <Button onClick={withdraw.bind(null, item.walletId)}>
                      Withdraw
                    </Button>
                  </td>
                  <td>{item.tokenBalance}</td>
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
      {showDepositModal && (
        <DepositModal
          walletId={currentWallet}
          msg="Deposit"
          onClose={closeModal}
        />
      )}
      {showWithdrawModal && (
        <WithdrawModal
          walletId={currentWallet}
          msg="Withdraw"
          onClose={closeModal}
        />
      )}
    </React.Fragment>
  );
}

export default WalletTable;
