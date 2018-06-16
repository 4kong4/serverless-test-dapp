pragma solidity ^0.4.11;

contract OwnableWithApp {
    address public owner;
    address public appContract;
    event OwnershipTransfered(address indexed _prevOwner, address indexed _newOwner);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier onlyApp {
        require(msg.sender == appContract);
        _;
    }

    function transferOwnership(address _newOwner) onlyOwner public {
        require(_newOwner != address(0));
        owner = _newOwner;
    }

    function setAppContract(address _newAppContract) onlyOwner public {
        require(_newAppContract != address(0));
        appContract = _newAppContract;
    }
}

contract BaseDappToken is OwnableWithApp {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    address public daoContract;

    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    event Sent(address from, address to, uint256 value);
    event Approval(address from, address to, uint256 value);

    constructor() public {

        decimals = 18;
        totalSupply = 1000000 * (10 ** uint256(decimals));

        name = "SDAPToken";
        symbol = "SDAP";

        balanceOf[msg.sender] = totalSupply;
    }

    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_to != address(0));
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        emit Sent(_from, _to, _value);
    }

    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public {
        require(allowance[_from][_to] >= _value);

        allowance[_from][_to] -= _value;
        _transfer(_from, _to, _value);
    }

    function approve(address _to, uint256 _value) public {
        allowance[msg.sender][_to] = _value;

        emit Approval(msg.sender, _to, _value);
    }
    
    function getBalanceOf(address _account) public view returns (uint256) {
        return balanceOf[_account];
    }
    
    function setDaoContract(address _newDaoContract) onlyOwner public {
        require(_newDaoContract != address(0));

        _transfer(daoContract, _newDaoContract, balanceOf[daoContract]);
        daoContract = _newDaoContract;
    }

    function replenishContractTokens() onlyOwner public {
        require(balanceOf[msg.sender] > 0);
        require(daoContract != address(0));

        _transfer(msg.sender, daoContract, balanceOf[msg.sender]);
    }

    function payment(address _from, uint256 _amount) public onlyApp returns (bool) {
        if(balanceOf[_from] >= _amount) {
            transferFrom(_from, daoContract, _amount);
            return true;
        } else {
            return false;
        }
    }

    function convertSDAP(uint _amount) public view returns (uint256) {
        return _amount * (10 ** uint256(decimals));
    }
}