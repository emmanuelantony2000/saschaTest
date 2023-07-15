pragma solidity ^0.8.0;

interface chainLinkPriceFeed {
    function getLatestPrice() external view returns (int256);
}

contract Mock {
    address public priceFeedAddress = 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419;
    
    function getLatestPrice() public view returns (int256) {
        return chainLinkPriceFeed(priceFeedAddress).getLatestPrice();
    }

    function add(uint256 a) public view returns (uint256) {
        uint b = 0;
        for (uint256 i = 0; i < 1000; i++) {
            a += i;
            int latestPrice = getLatestPrice();
            b += uint256(latestPrice);
        }
        return b;
    }

    function fibonacci(uint256 n) public pure returns (uint256) {
        if (n < 2) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}