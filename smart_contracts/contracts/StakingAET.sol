// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;


import "./Wallet.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract StakingAET is ERC20{


    event CreateWallet(uint256 indexed _walletId, address _address);
    event DepositWallet(uint256 indexed _walletId, uint256 amount);
    event WithdrawWallet(uint256 indexed _walletId, address _to, uint256 amount);


    struct StakingWallet{
        Wallet wallet;
        uint256 stakedValue;
        uint256 sinceBlock;
        uint256 untilBlock;
        
    }
    
    StakingWallet[] public stakingWallets;
    
    constructor() ERC20("AEON Token" , "AET"){}

    function createWallet() public returns(uint256,address){
        Wallet wallet = new Wallet();
        stakingWallets.push(StakingWallet(wallet,0,0,0));
        uint256 walletId = stakingWallets.length - 1;
        emit CreateWallet(walletId, address(wallet));
        return (walletId,address(wallet));
    }

    
    function walletDeposit(uint256 _walletId) public payable onlyOwner(_walletId){
        StakingWallet storage wallet = stakingWallets[_walletId];
        wallet.wallet.deposit{value: msg.value}();
        emit DepositWallet(_walletId, msg.value);
    }

    function walletWithdraw(uint256 _walletId, address payable _to, uint256 amount) public onlyOwner(_walletId) {
        StakingWallet storage wallet = stakingWallets[_walletId];
        wallet.wallet.withdraw(_to,amount);
        emit WithdrawWallet(_walletId, _to, amount);
    }

    function walletBalance(uint256 _walletId) public view returns(uint256) {
        StakingWallet storage wallet = stakingWallets[_walletId];
        return wallet.wallet.balanceOf();
    }


    receive() external payable {}
    fallback() external payable {}

    modifier onlyOwner(uint256 _walletId) {
        require(msg.sender != address(0) , "Not an valid address");
        StakingWallet memory wallet = stakingWallets[_walletId];
        require(wallet.wallet.owner() == msg.sender , "Not owner of the wallet");
        _;
    }


}