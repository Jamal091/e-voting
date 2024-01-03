import AdoptionABI from "../../../backend/build/contracts/Adoption.json";
import VotingABI from "../../../backend/build/contracts/Adoption.json";
import Web3 from "web3";

const AdoptionContract = () => {
  const web3 = new Web3(window.ethereum);
  const address = "0xCa9356B6D75B2c8D7eDDB70CC4fEf639D3290D9D";
  const contract = new web3.eth.Contract(AdoptionABI.abi, address);

  return contract;
};

const VotingContract = () => {
  const web3 = new Web3(window.ethereum);
  const address = "0xCa9356B6D75B2c8D7eDDB70CC4fEf639D3290D9D";
  const contract = new web3.eth.Contract(VotingABI.abi, address);

  return contract;
};

export { AdoptionContract, VotingContract };
