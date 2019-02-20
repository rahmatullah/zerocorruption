pragma solidity ^0.4.23;

contract Land {
    
    struct ownerStructor {
        uint age;
        string fName;
        string lName;
    }
    
    address public manager;
    ownerStructor[] public requests;
    mapping (uint => ownerStructor) landOwners;
    uint[] public ownersAcct;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor() public payable{
        manager = msg.sender;
    }
    
    function setLandOwners(uint _id, uint _age, string _fName, string _lName) public returns(uint) {
        ownerStructor storage landOwner = landOwners[_id];
        
        landOwner.age = _age;
        landOwner.fName = _fName;
        landOwner.lName = _lName;
        
        ownersAcct.push(_id);
        
        return _id;
    }
    
    function getLandOwners() view public returns(uint) {
        return requests.length;
    }
    
    function getLandOwner(uint _id) view public returns (uint, string, string) {
        return (landOwners[_id].age, landOwners[_id].fName, landOwners[_id].lName);
    }
    
    function countLandOwner() view public returns (uint) {
        return ownersAcct.length;
    }
    
}