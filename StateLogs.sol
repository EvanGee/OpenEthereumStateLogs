pragma solidity 0.5.1;

contract StateLogs {
    event addToLogs(uint8 command, string lable, string json);
    //0 means add, 1 means remove
    constructor() public {}
    function addToState(string memory _lable, string memory _state) internal {
        emit addToLogs(0, _lable, _state);
    }
    function removeFromState(string memory _lable, string memory _state) internal {
        emit addToLogs(1, _lable, _state);
    }
}




contract StateLogTestContract is StateLogs {

    constructor() public {
        addToState("greeting", "Hello Wolrld");
    }
    
    function fireEventAdd(string memory _owner) public{
        addToState('owners', _owner);
    }

    function fireEventRemove (string memory _owner) public {
        removeFromState('owners', _owner);
    }
}