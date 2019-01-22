var BillOfSale = artifacts.require("./BillOfSale.sol");

module.exports = async function(deployer) {
  await deployer.deploy(BillOfSale);
 };
