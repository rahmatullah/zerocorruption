pragma solidity ^0.4.4;

contract Test{

    struct ownerStructor {
        uint age;
        string fName;
        string lName;
    }

    mapping (uint => ownerStructor) landOwners;

    uint storeddata;
    string name;
    address manager;
    constructor() public payable {
        manager = msg.sender;
    }

    function setDataToDb(uint _id, uint _age, string _fName, string _lName) public{
    
        ownerStructor storage landOwner = landOwners[_id];
        
        landOwner.age = _age;
        landOwner.fName = _fName;
        landOwner.lName = _lName;
        
        //ownersAcct.push(_id);

    }
    function GetValue(uint _id) view public returns (uint, string, string) {
        return (landOwners[_id].age, landOwners[_id].fName, landOwners[_id].lName);
    }

}