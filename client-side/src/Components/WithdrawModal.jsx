import React, { useContext, useState, useRef } from "react";
import Modal from "../UI/Modal.jsx";
import Web3Context from "../web3/Web3-context.js";
import Button from "../UI/Button.jsx";
import Form from "react-bootstrap/Form";
import Web3 from "web3";
import Spinning from "../UI/Spinning.jsx";

function WithdrawModal({ onClose, msg, walletId }) {
  const web3Ctx = useContext(Web3Context);
  const ref = useRef(undefined);
  const [showMsg, setShowMsg] = useState(false);

  function deposit(e) {
    e.preventDefault();
    setShowMsg(true);
    const value = ref.current[0].value;
    if (value == 0) {
      return;
    }
    const web3 = new Web3(window.ethereum);
    const valueInWei = web3.utils.toWei(value, "ether");
    // add write
  }

  const MessageArea = (statusObj) => {
    const status = statusObj.status;
    const MSG = {};
    if (status === "error") {
      MSG.msg = "An error has occurred, please. Please try again";
      MSG.className = "error-msg-modal";
      setTimeout(() => {
        setShowMsg(false);
      }, 8000);
    } else if (status === "success") {
      MSG.msg = "The transaction request has been fulfilled.";
      MSG.className = "success-msg-modal";
      setTimeout(() => {
        setShowMsg(false);
        onClose();
      }, 8000);
    } else if (status === "loading") {
      MSG.msg = "Waiting ...";
      MSG.className = "waiting-msg-modal";
      MSG.spining = <Spinning isBtn={true} />;
    }

    return (
      <React.Fragment>
        <h3 className={MSG.className}>{MSG.msg}</h3>
        {MSG.spining}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Modal onClose={onClose} msg={msg}>
        <Form ref={ref}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="number"
              placeholder="Deposit Value in ETH"
              min="0"
              step={0.00001}
            />
          </Form.Group>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={deposit} type="submit">
              Withdraw
            </Button>
          </div>
          {showMsg && <MessageArea status={web3Ctx.walletDeposit.status} />}
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default WithdrawModal;
