// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { console } from "hardhat/console.sol";
import { ExampleExternalContract } from "./ExampleExternalContract.sol";

contract Staker {
	error Staker__StakingPeriodIsOver();
	error Staker__DeadLineHasNtBeenReached();
	error Staker__ThresholdNotMet();
	error Staker__ThresholdMetCantWithdraw();
	error Staker__FailedToSendETH();
	error Staker__NoBalanceToWithdraw();

	ExampleExternalContract public exampleExternalContract;

	mapping(address => uint256) public balances;
	uint256 public constant threshold = 1 ether;
	uint256 public deadline;

	event Stake(address indexed user, uint256 amount);
	event Executed(address indexed user);
	event Withdraw(address indexed user, uint256 amount);

	constructor(address exampleExternalContractAddress) {
		exampleExternalContract = ExampleExternalContract(
			exampleExternalContractAddress
		);
		deadline = block.timestamp + 72 hours;
	}

	// Collect funds in a payable `stake()` function and track individual `balances` with a mapping
	function stake() public payable {
		if (block.timestamp >= deadline) {
			revert Staker__StakingPeriodIsOver();
		}
		balances[msg.sender] += msg.value;
		emit Stake(msg.sender, msg.value);
	}

	// After some `deadline` allow anyone to call an `execute()` function
	function execute() public {
		if (block.timestamp < deadline) {
			revert Staker__DeadLineHasNtBeenReached();
		}
		if (address(this).balance < threshold) {
			revert Staker__ThresholdNotMet();
		}
		exampleExternalContract.complete{ value: address(this).balance }();
		emit Executed(msg.sender);
	}

	// If the `threshold` was not met, allow everyone to call a `withdraw()` function to withdraw their balance
	function withdraw() public {
		if (block.timestamp < deadline) {
			revert Staker__DeadLineHasNtBeenReached();
		}
		if (address(this).balance >= threshold) {
			revert Staker__ThresholdMetCantWithdraw();
		}
		uint256 userBalance = balances[msg.sender];
		if (userBalance <= 0) {
			revert Staker__NoBalanceToWithdraw();
		}

		balances[msg.sender] = 0;

		(bool sent, ) = msg.sender.call{ value: userBalance }("");
		if (!sent) {
			revert Staker__FailedToSendETH();
		}

		emit Withdraw(msg.sender, userBalance);
	}

	// Add a `timeLeft()` view function that returns the time left before the deadline for the frontend
	function timeLeft() public view returns (uint256) {
		if (block.timestamp >= deadline) {
			return 0;
		} else {
			return deadline - block.timestamp;
		}
	}

	// Add the `receive()` special function that receives eth and calls stake()
	receive() external payable {
		stake();
	}
}
