// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface tokenRecipient {
    function receiveApproval(
        address _from,
        uint256 _value,
        address _token,
        bytes calldata _extraData
    ) external;
}

contract SMPToken {
    string private s_name;
    string private s_symbol;
    uint8 private DECIMALS = 18;
    uint256 private s_totalSupply;

    mapping(address => uint256) private s_balanceOf;
    mapping(address => mapping(address => uint256)) private s_allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    event Burn(address indexed from, uint256 value);

    constructor(
        uint256 initialSupply,
        string memory tokenName,
        string memory tokenSymbol
    ) {
        s_totalSupply = initialSupply * 10 ** uint256(DECIMALS);
        s_balanceOf[msg.sender] = s_totalSupply;
        s_name = tokenName;
        s_symbol = tokenSymbol;
    }

    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_to != address(0x0));
        require(s_balanceOf[_from] >= _value);
        require(s_balanceOf[_to] + _value >= s_balanceOf[_to]);
        uint256 previousBalances = s_balanceOf[_from] + s_balanceOf[_to];
        s_balanceOf[_from] -= _value;
        s_balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        assert(s_balanceOf[_from] + s_balanceOf[_to] == previousBalances);
    }

    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= s_allowance[_from][msg.sender]);
        s_allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {
        s_allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function approveAndCall(
        address _spender,
        uint256 _value,
        bytes memory _extraData
    ) public returns (bool success) {
        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(
                msg.sender,
                _value,
                address(this),
                _extraData
            );
            return true;
        }
    }

    function burn(uint256 _value) public returns (bool success) {
        require(s_balanceOf[msg.sender] >= _value);
        s_balanceOf[msg.sender] -= _value;
        s_totalSupply -= _value;
        emit Burn(msg.sender, _value);
        return true;
    }

    function burnFrom(
        address _from,
        uint256 _value
    ) public returns (bool success) {
        require(s_balanceOf[_from] >= _value);
        require(_value <= s_allowance[_from][msg.sender]);
        s_balanceOf[_from] -= _value;
        s_allowance[_from][msg.sender] -= _value;
        s_totalSupply -= _value;
        emit Burn(_from, _value);
        return true;
    }

    function getAllowance(
        address _from,
        address _to
    ) external view returns (uint256) {
        return s_allowance[_from][_to];
    }

    function getBalanceOf(address _user) external view returns (uint256) {
        return s_balanceOf[_user];
    }

    function getTokenData() public view returns (uint256, string memory) {
        return (s_totalSupply, s_symbol);
    }

    function getSymbol() public view returns (string memory) {
        return s_symbol;
    }
}
