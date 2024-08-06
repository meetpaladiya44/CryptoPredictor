// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CryptoPrediction {
    struct Prediction {
        address owner;
        string coin;
        string reasoning;
        uint256 currentPrice;
        uint256 targetPrice;
        uint256 stakeAmount;
        uint256 targetDate;
        uint256 totalFeesCollected;
    }

    mapping(uint256 => Prediction) public predictions;

    uint256 public numberOfpredictions = 0;

    function createprediction(address _owner, string memory _coin, string memory _reasoning, uint256 _currentPrice, uint256 _targetPrice, uint256 _stakeAmount, uint256 _targetDate) public returns (uint256) {
        Prediction storage prediction = predictions[numberOfpredictions];

        require(prediction.targetDate < block.timestamp, "The Target Date should be a date in the future.");

        prediction.owner = _owner;
        prediction.coin = _coin;
        prediction.reasoning = _reasoning;
        prediction.currentPrice = _currentPrice;
        prediction.targetPrice = _targetPrice;
        prediction.stakeAmount = _stakeAmount;
        prediction.targetDate = _targetDate;
        prediction.totalFeesCollected = 0;

        numberOfpredictions++;

        return numberOfpredictions - 1;
    }

    function viewerFees(uint256 _id) public payable {
        uint256 amount = 1000000000000000;

        Prediction storage prediction = predictions[_id];

        (bool sent,) = payable(prediction.owner).call{value: amount}("");

        if(sent) {
            prediction.totalFeesCollected = prediction.totalFeesCollected + amount;
        }
    }


    function getpredictions() public view returns (Prediction[] memory) {
        Prediction[] memory allpredictions = new Prediction[](numberOfpredictions);

        for(uint i = 0; i < numberOfpredictions; i++) {
            Prediction storage item = predictions[i];

            allpredictions[i] = item;
        }

        return allpredictions;
    }

    function getTotalFeesCollected(uint256 _id) public view returns (uint256) {
        require(_id < numberOfpredictions, "Invalid prediction ID");
        return predictions[_id].totalFeesCollected;
    }

    //TEST
    function send(address to) external payable {
        (bool success,) = to.call{value: msg.value}("");
        if (!success) {
            revert("Failed to send ETH");
        }
    }
}