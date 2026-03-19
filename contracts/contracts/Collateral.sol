// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Collateral
 * @notice ERC20 collateral token for prediction markets (testnet use)
 * @dev For mainnet, use USDC or bridged stablecoin instead
 */
contract Collateral is ERC20, Ownable {
    constructor() ERC20("QuantumBets Collateral", "QBTC") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
