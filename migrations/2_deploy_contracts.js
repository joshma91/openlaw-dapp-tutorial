var BillOfSale = artifacts.require("./BillOfSale.sol");

module.exports = async function(deployer) {
  await deployer.deploy(BillOfSale);
  // const contract = await BillOfSale.deployed()
  // await contract.recordContract("testing description", 100000000000000, "0x04Bb2058E3cfC31721d50DceF96C576C761b38c0", "0x04Bb2058E3cfC31721d50DceF96C576C761b38c0")
};
