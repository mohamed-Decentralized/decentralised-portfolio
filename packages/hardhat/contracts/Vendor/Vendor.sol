// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import {SMPToken} from "./SMPToken.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Vendor is Ownable {
    error Vendor__NotEnoughETH();
    error Vendor__TransferFailed();
    error Vendor__InsufficientBalance();
    error Vendor__InsufficientContractBalance();
    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

    SMPToken public smpToken;
    uint256 private constant TOKEN_PER_ETH = 100;
    uint256 private constant TOKEN_PRICE = 1 ether / TOKEN_PER_ETH;

    constructor(address tokenAddress) {
        smpToken = SMPToken(tokenAddress);
    }

    function buyTokens() public payable {
        if (msg.value < TOKEN_PRICE) {
            revert Vendor__NotEnoughETH();
        }
        uint256 tokenCount = msg.value / TOKEN_PRICE;
        smpToken.transfer(msg.sender, tokenCount);
        emit BuyTokens(msg.sender, msg.value, tokenCount);
    }

    function withdraw() public {
        bool success = payable(owner()).send(address(this).balance);
        if (!success) {
            revert Vendor__TransferFailed();
        }
    }

    function sellTokens(uint256 _amount) public {
        uint256 userHoldings = smpToken.getBalanceOf(msg.sender);
        if (userHoldings < _amount) {
            revert Vendor__InsufficientBalance();
        }
        uint256 tokenPriceInETH = userHoldings * TOKEN_PRICE;
        uint256 contractHoldings = address(this).balance;
        if (contractHoldings < tokenPriceInETH) {
            revert Vendor__InsufficientContractBalance();
        }
        smpToken.transferFrom(msg.sender, address(this), _amount);
        bool success = payable(msg.sender).send(tokenPriceInETH);
        if (!success) {
            revert Vendor__TransferFailed();
        }
    }

    function getTokenPerETH() public pure returns (uint256) {
        return TOKEN_PER_ETH;
    }
}
