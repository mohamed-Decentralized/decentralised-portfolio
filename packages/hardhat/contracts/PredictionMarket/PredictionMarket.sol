// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PredictionMarket is Ownable {
    using SafeMath for uint256;

    enum MarketStatus {
        Open,
        Closed,
        Resolved
    }
    enum Prediction {
        Yes,
        No
    }

    struct Market {
        string question;
        uint256 endTime;
        MarketStatus status;
        uint256 yesPool;
        uint256 noPool;
        mapping(address => uint256) yesBets;
        mapping(address => uint256) noBets;
        bool result;
    }

    Market[] public markets;

    event MarketCreated(
        uint256 indexed marketId,
        string question,
        uint256 endTime
    );
    event BetPlaced(
        uint256 indexed marketId,
        address indexed user,
        Prediction prediction,
        uint256 amount
    );
    event MarketResolved(uint256 indexed marketId, bool result);

    function createMarket(
        string memory _question,
        uint256 _endTime // onlyOwner
    ) external {
        require(_endTime > block.timestamp, "End time must be in the future");
        Market storage newMarket = markets.push();
        newMarket.question = _question;
        newMarket.endTime = _endTime;
        newMarket.status = MarketStatus.Open;
        emit MarketCreated(markets.length - 1, _question, _endTime);
    }

    function placeBet(
        uint256 _marketId,
        Prediction _prediction
    ) external payable {
        Market storage market = markets[_marketId];
        require(market.status == MarketStatus.Open, "Market is not open");
        require(block.timestamp < market.endTime, "Market has ended");
        require(msg.value > 0, "Bet amount must be greater than zero");

        if (_prediction == Prediction.Yes) {
            market.yesBets[msg.sender] = market.yesBets[msg.sender].add(
                msg.value
            );
            market.yesPool = market.yesPool.add(msg.value);
        } else {
            market.noBets[msg.sender] = market.noBets[msg.sender].add(
                msg.value
            );
            market.noPool = market.noPool.add(msg.value);
        }

        emit BetPlaced(_marketId, msg.sender, _prediction, msg.value);
    }

    function resolveMarket(
        uint256 _marketId,
        bool _result // onlyOwner
    ) external {
        Market storage market = markets[_marketId];
        require(block.timestamp > market.endTime, "Market is still ongoing");
        require(market.status == MarketStatus.Open, "Market is not open");

        market.status = MarketStatus.Resolved;
        market.result = _result;

        emit MarketResolved(_marketId, _result);
    }

    function claimWinnings(uint256 _marketId) external {
        Market storage market = markets[_marketId];
        require(
            market.status == MarketStatus.Resolved,
            "Market is not resolved"
        );

        uint256 winnings;
        if (market.result) {
            winnings = market
                .yesBets[msg.sender]
                .mul(market.yesPool.add(market.noPool))
                .div(market.yesPool); // 1 * 5 + 4 / 5
            market.yesBets[msg.sender] = 0;
        } else {
            winnings = market
                .noBets[msg.sender]
                .mul(market.yesPool.add(market.noPool))
                .div(market.noPool);
            market.noBets[msg.sender] = 0;
        }

        require(winnings > 0, "No winnings to claim");
        payable(msg.sender).transfer(winnings);
    }

    function getMarket(
        uint256 index
    )
        public
        view
        returns (string memory, uint256, MarketStatus, uint256, uint256, bool)
    {
        require(index < markets.length, "Index out of bounds");
        Market storage market = markets[index];
        return (
            market.question,
            market.endTime,
            market.status,
            market.yesPool,
            market.noPool,
            market.result
        );
    }

    function getMarketQuestion(
        uint256 index
    ) public view returns (string memory) {
        require(index < markets.length, "Index out of bounds");
        return markets[index].question;
    }

    function getAllMarketQuestions() external view returns (string[] memory) {
        uint256 count = markets.length;
        string[] memory questions = new string[](count);

        for (uint256 i = 0; i < count; i++) {
            questions[i] = getMarketQuestion(i);
        }

        return questions;
    }
}
