// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves;
    address[] wavers;

    constructor() {
        // console.log("I'm a contract. I was pretty smart already But now I'm really really smart Very very smart");
    }

    function waverExists(address sender) view public returns (bool) {
        address waver;
        for(uint i=0; i<wavers.length; i++) {
            waver = wavers[i];
            if(waver == sender) {
                return true;
            }
        }
        return false;
    }

    function wave() public {
        address sender = msg.sender;
        totalWaves += 1;

        if(!waverExists(sender)) {
            wavers.push(sender);
            console.log("%s has waved for the first time!", sender);
        } else {
            console.log("%s has waved again!", sender);
        }  
    }

    function getTotalWaves() view public returns (uint) {
        console.log("We have %d total waves", totalWaves);
        console.log("Waved by %d unique wavers", wavers.length);
        return totalWaves;
    }
}
