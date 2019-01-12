import React, { Component } from "react";
import SimpleStorageContract from "./contracts/BillOfSale.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

import "./App.css";

class App extends Component {
  state = { seller: null, buyer: null, descr: null, price: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(SimpleStorageContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  runExample = async () => {
    const { contract } = this.state;

    const seller = await contract.seller()
    const buyer = await contract.buyer()
    const descr = await contract.descr()
    const price = await contract.price()

    this.setState({ seller, buyer, descr, price: price.toNumber() });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Bill of Sale</h1>
        <div>Seller: {this.state.seller}</div>
        <div>Buyer: {this.state.buyer}</div>
        <div>Description: {this.state.descr}</div>
        <div>Price: {this.state.price/(10**18)}</div>
      </div>
    );
  }
}

export default App;
