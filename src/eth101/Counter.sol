pragma solidity >=0.4.22 <0.6.0;

contract SimpleCounter {

    int256 counter;
    address owner;

    constructor() public {
        counter = 0;
        owner = msg.sender;
    }

    function getCounter() public view returns(int) {
        return counter;
    }

    function increment() public {
        //require(msg.value > 0.1 ether )
        // add payable modifier for above
        counter += 1;
    }

    function decrement() public {
        counter -= 1;
    }

    function reset() public {
        require(msg.sender == owner);
        counter = 0;
    }
}
