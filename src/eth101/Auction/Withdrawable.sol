pragma solidity >=0.5.0 <0.6.0;

// Withdrawal pattern is safe and apt for auctions...
// Keep track of bidders and their bid totals,
// so they can withdraw at the end of auction
contract Withdrawable {
    mapping (address => uint) internal pendingWithdrawals;

    // how a sender can get their money back
    function withdraw() public returns(bool) {
        uint amount = pendingWithdrawals[msg.sender];
        if (amount > 0) {
            pendingWithdrawals[msg.sender] = 0;
            msg.sender.transfer(amount);
        }
        return true;
    }
}
