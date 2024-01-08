const hre = require("hardhat");

async function main() {
  const Voting = await hre.ethers.getContractFactory("Voting");
  const contract = await Voting.deploy();

  await contract.deployed();

  console.log(`ContractAddress : ${contract.address}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
