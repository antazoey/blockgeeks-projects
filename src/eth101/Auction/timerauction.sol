pragma solidity >=0.5.0 <0.6.0;

import "./baseauction.sol";
import "./Withdrawable.sol";

contract TimerAuction is BaseAuction, Withdrawable {
    string public item;
    uint public auctionEnd;
    // 0 address
    address public maxBidder;
    // inits to 0 automatically
    uint public maxBid;
    bool public ended;

    constructor(string memory _item, uint _durationMinutes) public {
        item = _item;
        auctionEnd = now + (_durationMinutes * 1 minutes);
    }

    function bid() external payable {
        require(now < auctionEnd);
        require(msg.value > maxBid);

        // if not the maxBidder, return eth to prev maxBidder
        // by storing it to be returned later
        if (maxBidder != address(0)) {

            pendingWithdrawals[maxBidder] += maxBid;

            // original vers:
            //      maxBidder.transfer(maxBid);
            //
            // NOT GOOD PRACTICE
            // re-entrancy attacks in solidity, hacks like the DAO hack, spankchain hack, etc.
            // don't invoke external addresses you don't control yourself.
            // we are modifying our own state after the external contract
            // the external function can come back into our function a second time.
            // ethereum has patched up this using gas prices
            // change state BEFORE calling external function
            // DO THIS with Withdrawable pattern... see Withdrawable.sol
        }

        maxBidder = msg.sender;
        maxBid = msg.value;
        emit BidAccepted(maxBidder, maxBid);
    }

    function end() public {
        require(!ended);
        require(now >= auctionEnd);
        ended = true;

        emit AuctionComplete(maxBidder, maxBid);

        owner.transfer(maxBid);
    }
}
