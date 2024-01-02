import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { ContractInfo } from "../contract/ContractInfo";
import CopyIcon from "../UI/CopyIcon";

function WalletInfo() {
  const [isCopied, setIsCopied] = useState(false);
  const clickCopyBoard = () => {
    navigator.clipboard.writeText(ContractInfo.ADDRESS);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <React.Fragment>
      <div className="wallet-title" style={{ marginTop: "1rem" }}>
        <h1>Wallet Info</h1>
      </div>
      <div className="wallet-info-content">
        <Table bordered hover bsPrefix="my-table">
          <tbody>
            <tr>
              <td className="bold">Staking Pool Address :</td>
              <td>
                {ContractInfo.ADDRESS}{" "}
                <CopyIcon
                  onClick={clickCopyBoard}
                  isCopied={isCopied}
                  className="copy-icon-area"
                />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="bold">Total Address Staked :</td>
              <td>123</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="bold">Total Staked :</td>
              <td>123</td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/* <div className="Wallet-Info-Row">
        <div className="wallet-info-title">
          <h1>Wallet Info</h1>
        </div>
        <div className="wallet-info-content">
          <ul className="wallet-info-list">
            <li className="wallet-info-list__item">
              <h5>Staking Pool Address : </h5>
            </li>
            <li className="wallet-info-list__item">
              <h5>Total Address Staked : </h5>
            </li>
            <li className="wallet-info-list__item">
              <h5>Total Staked : </h5>
            </li>
          </ul>
        </div>
      </div> */}
    </React.Fragment>
  );
}

export default WalletInfo;
