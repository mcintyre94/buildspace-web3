// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves;
    uint private seed;

    event NewWave(address indexed from, uint timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint timestamp;
    }

    Wave[] waves;

    mapping(address => uint) public lastWavedAt;

    constructor() payable {
        console.log("Contract starting!");
    }

    function wave(string memory _message) public {
        address sender = msg.sender;
        require(lastWavedAt[sender] + 15 minutes < block.timestamp, "You must wait 15 minutes between waves!");
        lastWavedAt[sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s waved w/ message %s", sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);

        // Pseudo random number 0-99
        uint randomNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: ", randomNumber);

        seed = randomNumber;

        // 50% chance of winning
        if(randomNumber < 50) {
            uint prizeAmount = 0.001 ether;
            require(prizeAmount < address(this).balance, "Trying to withdraw more money than the contract has! :(");
            (bool success,) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract, sorry!");
        }
    }

    function getAllWaves() view public returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() view public returns (uint) {
        return totalWaves;
    }
}
