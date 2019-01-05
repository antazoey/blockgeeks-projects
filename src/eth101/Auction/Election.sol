pragma solidity >=0.4.22 <0.6.0;

contract Election {
    address public owner;
    string public name;

    event Vote(string candidateName, uint voteCount);

    struct Candidate {
        string name;
        uint voteCount;
    }

    struct Voter {
        bool authorized;
        bool voted;
        uint vote;      // candidate id
    }

    uint public totalVotes;
    Candidate[] public candidates;
    mapping (address => Voter) public voters;

    modifier ownerOnly() {
        require(msg.sender == owner, "Owner only");
        _;
    }

    constructor(string memory _name) public {
        owner = msg.sender;
        name = _name;
    }

    function getNumCandidates() public view returns(uint) {
        return candidates.length;
    }

    function addCandidate(string memory _name) public ownerOnly {
        candidates.push(Candidate(_name, 0));
    }

    function authorize(address _voter) public ownerOnly {
        require(!voters[_voter].voted, "Already voted");
        voters[_voter].authorized = true;
    }

    function vote(uint _candidate) public {
        require(voters[msg.sender].authorized, "Not authorized to vote.");
        require(!voters[msg.sender].voted, "Already voted.");
        require(_candidate < candidates.length, "Not a candidate.");

        voters[msg.sender].vote = _candidate;
        voters[msg.sender].voted = true;

        candidates[_candidate].voteCount += 1;
        totalVotes += 1;
        emit Vote(candidates[_candidate].name, candidates[_candidate].voteCount);
    }
}
