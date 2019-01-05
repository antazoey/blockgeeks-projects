pragma solidity >=0.4.22 <0.6.0;
contract MyEscrow {
    enum State {
        AWAITING_PAYMENT,
        AWAITING_DELIVERY,
        COMPLETE,
        REFUNDED
    }
    State public currentState;
    address payable buyer;
    address payable seller;
    address public arbiter;

    // attach to function as condition checks
    // _ represents function is attacked to (meaning run function now)
    modifier buyerOnly() {
        require(msg.sender == buyer || msg.sender == arbiter);
        _;
    }

    modifier sellerOnly() {
        require(msg.sender == seller || msg.sender == arbiter);
        _;
    }


    modifier inState(State expectedState) {
        require(currentState == expectedState);
        _;
    }

    constructor(address payable _buyer, address payable _seller, address _aribter) public {
        buyer = _buyer;
        seller = _seller;
        arbiter = _aribter;
    }

    function sendPayment() public payable buyerOnly inState(State.AWAITING_PAYMENT) {
        currentState = State.AWAITING_DELIVERY;
    }

    function confirmDelivery() public payable buyerOnly inState(State.AWAITING_DELIVERY) {
        currentState = State.COMPLETE;
        // Balance of contract, all contracts have this
        seller.transfer(address(this).balance);
    }

    function refundBuyer() public payable sellerOnly inState(State.AWAITING_DELIVERY) {
        currentState = State.REFUNDED;
        buyer.transfer(address(this).balance);
    }
}