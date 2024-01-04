import React, { useState, useEffect, useCallback } from "react";
import Web3Context from "./Web3-context.js";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { ContractInfo } from "../contract/ContractInfo.js";
import { useContractWrite } from "wagmi";
import Web3 from "web3";

const Web3Provider = (props) => {
  const [balance, setBalance] = useState(undefined);
  const [Wallets, setWallets] = useState([]);
  const [walletsIsLoading, setWalletsIsLoading] = useState(false);

  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isDisconnected } = useAccount();

  // create Wallet
  const createWallet = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "createWallet",
  });

  const walletDeposit = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "walletDeposit",
  });

  const walletConnect = () => {
    open({ view: "Networks" });
  };

  const createContractInstace = () => {
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(
      ContractInfo.ABI,
      ContractInfo.ADDRESS
    );
    return contractInstance;
  };

  const getWallets = async () => {
    const contractInstance = createContractInstace();
    const wallets = await contractInstance.methods.getWallets().call({
      from: address,
    });

    return wallets;
  };

  const getWalletBalance = async (walletId) => {
    const contractInstance = createContractInstace();

    const walletBalance = await contractInstance.methods
      .walletBalance(walletId)
      .call({
        from: address,
      });
    return walletBalance;
  };

  const getAETBalance = async (walletAdr) => {
    const contractInstance = createContractInstace();
    const AETBalance = await contractInstance.methods
      .balanceOf(walletAdr)
      .call({ from: address });
    return AETBalance;
  };

  const getIsStake = async (walletId) => {
    const contractInstance = createContractInstace();
    const isStake = await contractInstance.methods
      .getIsStaked(walletId)
      .call({ from: address });
    return isStake;
  };

  const getCurrentStake = async (walletId) => {
    const contractInstance = createContractInstace();
    const currentStake = await contractInstance.methods
      .currentStake(walletId)
      .call({ from: address });
    return currentStake;
  };

  const getCurrentRewards = async (walletId) => {
    const contractInstance = createContractInstace();
    const curretRewards = contractInstance.methods
      .calculateCurrentReward(walletId)
      .call({ from: address });
    return curretRewards;
  };

  const disconnectWallet = async () => {
    disconnect();
  };

  const getAllWallets = async () => {
    setWalletsIsLoading(true);
    const web3 = new Web3(window.ethereum);
    const walletIDs = await getWallets();
    const walletsArr = [];
    for (let i = 0; i < walletIDs.length; i++) {
      const walletId = Number(walletIDs[i]);
      const walletBalance = await getWalletBalance(walletId);
      const walletBalanceEth = await web3.utils.fromWei(walletBalance, "ether");

      // get AET balance
      const isStaked = await getIsStake(walletId);
      const currentStake = await getCurrentStake(walletId);
      const currentReward = await getCurrentRewards(walletId);
      const wallet = {
        walletId: walletId,
        currentBalance: Number(walletBalanceEth),
        tokenBalance: 1111,
        withdraw: 123,
        IsStaked: isStaked ? `true` : "false",
        stake: 124,
        currentStake: Number(currentStake),
        rewards: Number(currentReward),
      };
      walletsArr.push(wallet);
    }

    setWallets(walletsArr);
    setWalletsIsLoading(false);
  };

  const getBalance = useCallback(
    async (web3) => {
      const balanceWei = await web3?.eth.getBalance(address);
      const balanceEth = web3?.utils.fromWei(balanceWei, "ether");
      const balance = Number(balanceEth).toFixed(4);
      setBalance(balance);
    },
    [address]
  );

  async function setWeb3Values() {
    const web3 = new Web3(window.ethereum);
    getBalance(web3);
  }

  useEffect(() => {
    if (!isDisconnected && address) {
      setWeb3Values();
    }
  }, [isDisconnected, address, getBalance]);

  const web3Context = {
    isConnected: !isDisconnected,
    address,
    balance,
    createWallet,
    walletDeposit,

    getWallets,
    walletsIsLoading,
    Wallets,
    getAllWallets,
    getCurrentRewards,
    getCurrentStake,
    getIsStake,
    getAETBalance,
    getWalletBalance,
    getWallets,
    walletConnect,
    disconnectWallet,
  };

  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
