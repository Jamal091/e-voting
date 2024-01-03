// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Adoption {
  address[16] adopters;

  function setAdopters(uint _id) public returns (uint) {
    assert(_id >= 0);

    adopters[_id] = msg.sender;

    return _id;
  }

  function revertOwnership(uint _id) public returns (uint) {
    assert(_id >= 0);

    adopters[_id] = address(0x0000000000000000000000000000000000000000);

    return _id;
  }

  function getAdopters() public view returns (address[16] memory){
    return adopters;
  }

}