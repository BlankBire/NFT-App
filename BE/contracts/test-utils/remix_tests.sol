// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
// Minimal stub so VS Code stops flagging imports in Remix tests.
// This is NOT a real implementation; use Remix IDE for actual execution.
library Assert {
    function equal(uint actual, uint expected, string memory /*message*/) internal pure returns (bool) {
        return actual == expected;
    }
    function equal(bytes32 actual, bytes32 expected, string memory /*message*/) internal pure returns (bool) {
        return actual == expected;
    }
}
