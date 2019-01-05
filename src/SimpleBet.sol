pragma solidity >=0.4.22 <0.6.0;

contract SimpleBet {

    struct Bet {
        address payable better;
        uint guess;
    }

    Bet[] public bets;

    uint public minBet;
    uint public betsPerRound;
    uint public minGuess;
    uint public maxGuess;
    uint public result;

    event WinnerRewarded(address winner, uint amount);

    constructor() public payable {
        minBet = 1 ether;
        betsPerRound = 2;
        minGuess = 0;
        maxGuess = 255;
    }

    // returns balance of smart contract
    function getBalance() view public returns(uint256) {
        return address(this).balance;
    }

    function bet(uint _guess) public payable {
        require(msg.value == minBet);
        require(bets.length < betsPerRound);
        require(_guess >= minGuess && _guess <= maxGuess);

        bets.push(Bet(msg.sender, _guess));

        if (bets.length >= betsPerRound) {
            rewardWinner();
        }
    }

    function rewardWinner() internal {
        result = rand();
        uint winningGuess = 2 ** 255; // Large number
        address payable currentWinner = address(0);

        for (uint i = 0; i < bets.length; i++) {
            // abs value of diff so it is positive
            uint guess = (bets[i].guess - result) ** 2;
            if (guess < winningGuess) {
                winningGuess = guess;
                currentWinner = bets[i].better;
            }
        }
        delete bets; // resets array length to 0
        uint winnings = address(this).balance;
        currentWinner.transfer(winnings);
        emit WinnerRewarded(currentWinner, winnings);
    }

    function rand() internal view returns(uint) {
        // use prev block's hash (as this block included this
        // code and isnt compiled at time of hash).
        bytes32 seed = blockhash(block.number - 1);
        // add timestamp as 'salt', meaning to make more random.
        uint seedInt = uint(seed)/2 + now;
        return uint(sha256(abi.encodePacked(seedInt))) % (maxGuess+1);
    }
}
