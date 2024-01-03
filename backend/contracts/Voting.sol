// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Voting {
  struct votingData{
    uint id;
    string name;
    string picture;
  }

  votingData[] public voting;
  uint counter_id = 0;

  function addVoting(string memory _name, string memory _picture) public returns (string memory) {
    votingData memory inData;

    inData.id = counter_id;
    inData.name = _name;
    inData.picture = _picture;

    voting.push(inData);

    counter_id++;

    return _name;
  }

  function getVoting() public view returns (votingData[] memory) {
    return voting;
  }

  function deleteVotingById(uint _id) public returns (uint){
    delete voting[_id];

    return _id;
  }
}
