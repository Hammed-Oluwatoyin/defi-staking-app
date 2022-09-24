// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migrations {
    address public owner;
    uint256 last_completed_migration;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender == owner) _; // if the sender is the owner, then continue;
    }

    function setCompleted(uint256 completed_migration_number) public onlyOwner {
        last_completed_migration = completed_migration_number; //stores the value into a new variable
    }

    function update(address new_address) public onlyOwner {
        Migrations updated = Migrations(new_address);
        updated.setCompleted(last_completed_migration);
    }
}
