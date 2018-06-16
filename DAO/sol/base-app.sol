pragma solidity ^0.4.11;

interface Token {
    function payment(address _from, uint256 _value) external returns (bool);
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

contract BaseDApp is Ownable {
    string public advBannerContent;
    uint256 public bannerRentPrice;
    address public lastParticipant;
    Token public token;

    constructor(Token _token) public {
        token = _token;
        bannerRentPrice = token.convertSDAP(200); // SDAP tokens
    }

    function setPrice(uint _price) onlyOwner public {
        bannerRentPrice = token.convertSDAP(_price);
    }

    function setBannerContent(string _newBannerContent) public returns(bool) {
        if(token.payment(msg.sender, bannerRentPrice)) {
            advBannerContent = _newBannerContent;
            lastParticipant = msg.sender;
            return true;
        }

        return false;
    }
}
