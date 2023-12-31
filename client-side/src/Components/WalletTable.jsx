import React from "react";
import Table from "react-bootstrap/Table";

function WalletTable(props) {
  return (
    <React.Fragment>
      <Table bordered hover bsPrefix="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Wallet ID</th>
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
          {props.wallets.map((item) => {
            return (
              <tr>
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
    </React.Fragment>
  );
}

export default WalletTable;
