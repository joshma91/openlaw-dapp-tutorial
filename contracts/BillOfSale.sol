pragma solidity ^0.5.0;

contract BillOfSale {
  address public seller;
  address public buyer;
  string public descr;
  uint public price;

  function recordContract(string memory _descr, uint _price,
    address _seller, address _buyer
  ) public {
    descr = _descr;
    price = _price;
    seller = _seller; 
    buyer = _buyer;
  }

  function () public payable { }

  function confirmReceipt() public {
    require(msg.sender == buyer, "only buyer can confirm");
    require(this.balance == price, "purchase price must be funded");
    seller.transfer(address(this).balance);
  }
}