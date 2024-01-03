var Adoption = artifacts.require("./Adoption.sol");

module.exports = function (_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(Adoption);
};
