pragma solidity >=0.5.0 <0.6.0;

interface Auction {
    function bid() external payable;
    function end() external;
}
