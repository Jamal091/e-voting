import AdoptionABI from "../../../blockchain/build/contracts/Adoption.json";
import VotingABI from "../../../blockchain/build/contracts/Voting.json";
import Web3 from "web3";

const AdoptionContract = () => {
  const web3 = new Web3(window.ethereum);
  const address = "0xC6780e646b17Cb1d81f8ECb0F1045aB444d3558d";
  const contract = new web3.eth.Contract(AdoptionABI.abi, address);

  return contract;
};

const VotingContract = () => {
  const web3 = new Web3(window.ethereum);
  const address = "0xC6780e646b17Cb1d81f8ECb0F1045aB444d3558d";
  const contract = new web3.eth.Contract(VotingABI.abi, address);

  return contract;
};

export { AdoptionContract, VotingContract };
