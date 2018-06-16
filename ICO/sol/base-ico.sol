pragma solidity ^0.4.11;

interface Token {
    function transfer(address _receiver, uint256 _value) external;
    function convertSDAP(uint _amount) external returns (uint256);
}

contract Ownable {
    address public owner;
    event OwnershipTransfered(address indexed _prevOwner, address indexed _newOwner);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) onlyOwner public {
        require(_newOwner != address(0));
        owner = _newOwner;
    }
}

contract BaseDAppICO is Ownable {
    uint public buyPrice;
    Token public token;

    constructor(Token _token) public {
        token = _token;
        buyPrice = 1 finney;
    }

    function () payable public {
        _buy(msg.sender, msg.value);
    }

    function buy(address _sender, uint256 _amount) payable public returns (uint) {
        uint tokens = _buy(_sender, _amount);
        return tokens;
    }

    function _buy(address _sender, uint256 _amount) internal returns (uint) {
        uint tokens = _amount/buyPrice;
        token.transfer(_sender, token.convertSDAP(tokens));
        return tokens;
    }

    function withdrawFunds(uint256 _withdrawalAmount) onlyOwner public {
        require(_withdrawalAmount <= address(this).balance);
        msg.sender.transfer(_withdrawalAmount);
    }

    function withdrawAllFunds() onlyOwner public {
        msg.sender.transfer(address(this).balance);
    }
}
