// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Voting {
  struct VotingData {
    string candidate;
    uint votes;
  }

  mapping(uint => VotingData) public votes;
  uint public totalVotes;

  function addVotes(string memory _candidate) public returns (string memory) {
    VotingData memory newVote;
    newVote.candidate = _candidate;
    newVote.votes = 0;

    votes[totalVotes] = newVote;
    totalVotes++;

    return _candidate;
  }

  function getVotes() public view returns (VotingData[] memory) {
    VotingData[] memory result = new VotingData[](totalVotes);
    for (uint i = 0; i < totalVotes; i++) {
      result[i] = votes[i];
    }
    return result;
  }

  function Votes(uint _id) public returns (uint) {
    require(_id < totalVotes, "Invalid candidate ID");

    votes[_id].votes++;

    return _id;
  }
}