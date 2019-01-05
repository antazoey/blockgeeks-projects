pragma solidity >=0.5.0 <0.6.0;

import "./auction.sol";

contract BaseAuction is Auction {

    address payable public owner;

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    event AuctionComplete(address winner, uint bid);

    event BidAccepted(address bidder, uint bid);

    constructor() public {
        owner = msg.sender;
    }
}
