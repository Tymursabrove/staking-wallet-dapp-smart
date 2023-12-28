import React from "react";

function WalletInfo() {
  return (
    <React.Fragment>
      <div className="Wallet-Info-Row">
        <div className="wallet-info-title">
          <h1>Wallet Info</h1>
        </div>
        <div className="wallet-info-content">
          <ul className="wallet-info-list">
            <li className="wallet-info-list__item">
              <p>Staking Pool Address : </p>
            </li>
            <li className="wallet-info-list__item">
              <p>STotal Address Staked : </p>
            </li>
            <li className="wallet-info-list__item">
              <p>Total Staked : </p>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WalletInfo;
