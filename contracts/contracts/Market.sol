// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title Market
 * @notice Minimal binary prediction market with oracle resolution hook
 */
contract Market is Ownable, ReentrancyGuard {
    IERC20 public collateral;

    enum State { Active, Resolved }
    enum Outcome { None, Yes, No }

    struct MarketData {
        string question;
        uint256 endTime;
        State state;
        Outcome winningOutcome;
        uint256 yesPool;
        uint256 noPool;
    }

    uint256 public marketCounter;
    mapping(uint256 => MarketData) public markets;
    mapping(uint256 => mapping(address => uint256)) public yesShares;
    mapping(uint256 => mapping(address => uint256)) public noShares;

    address public oracle;

    event MarketCreated(uint256 indexed marketId, string question, uint256 endTime);
    event SharesBought(uint256 indexed marketId, address buyer, bool outcome, uint256 amount, uint256 shares);
    event MarketResolved(uint256 indexed marketId, Outcome winningOutcome);

    modifier onlyOracle() {
        require(msg.sender == oracle, "Not oracle");
        _;
    }

    constructor(address _collateral) Ownable(msg.sender) {
        collateral = IERC20(_collateral);
        oracle = msg.sender;
    }

    function setOracle(address _oracle) external onlyOwner {
        oracle = _oracle;
    }

    function createMarket(string calldata question, uint256 duration) external onlyOwner returns (uint256) {
        uint256 id = ++marketCounter;
        markets[id] = MarketData({
            question: question,
            endTime: block.timestamp + duration,
            state: State.Active,
            winningOutcome: Outcome.None,
            yesPool: 0,
            noPool: 0
        });
        emit MarketCreated(id, question, block.timestamp + duration);
        return id;
    }

    function buyShares(uint256 marketId, bool outcome, uint256 amount) external nonReentrant returns (uint256) {
        MarketData storage m = markets[marketId];
        require(m.state == State.Active, "Market not active");
        require(block.timestamp < m.endTime, "Market ended");
        require(amount > 0, "Zero amount");

        collateral.transferFrom(msg.sender, address(this), amount);

        uint256 shares = amount;
        if (outcome) {
            yesShares[marketId][msg.sender] += shares;
            m.yesPool += shares;
        } else {
            noShares[marketId][msg.sender] += shares;
            m.noPool += shares;
        }

        emit SharesBought(marketId, msg.sender, outcome, amount, shares);
        return shares;
    }

    function resolve(uint256 marketId, bool yesWins) external onlyOracle {
        MarketData storage m = markets[marketId];
        require(m.state == State.Active, "Already resolved");
        require(block.timestamp >= m.endTime, "Not ended");

        m.state = State.Resolved;
        m.winningOutcome = yesWins ? Outcome.Yes : Outcome.No;

        emit MarketResolved(marketId, m.winningOutcome);
    }

    function claimWinnings(uint256 marketId) external nonReentrant {
        MarketData storage m = markets[marketId];
        require(m.state == State.Resolved, "Not resolved");

        uint256 payout = 0;
        if (m.winningOutcome == Outcome.Yes) {
            payout = yesShares[marketId][msg.sender];
            yesShares[marketId][msg.sender] = 0;
        } else if (m.winningOutcome == Outcome.No) {
            payout = noShares[marketId][msg.sender];
            noShares[marketId][msg.sender] = 0;
        }

        require(payout > 0, "Nothing to claim");
        collateral.transfer(msg.sender, payout);
    }
}
