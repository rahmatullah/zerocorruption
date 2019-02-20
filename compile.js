const path =  require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider);

const inboxPath = path.resolve(__dirname, 'contracts', 'land.sol');
//console.log(inboxPath);
const source = fs.readFileSync(inboxPath, 'UTF-8');
//console.log(source);


console.log(solc.compile(source, 1).contracts[':Land']);
