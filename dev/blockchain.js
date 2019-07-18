const sha256 = require('sha256');

function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];// All thh transactions here, are not recorded. THey get validates and recorded in the blockchain--
    // --when a new block is created
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
     const newBlock = {// Create a new block with all the transactions and push it into the chain
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,// All of the new and pending transactions that have been created, will be-
        //-- added onto this new block, to add them into the block chain, so that they can never be changed
        nonce: nonce,
        hash: hash,// Data from the new block => pendingTransactions passed into hash fn to be compressed into a single--
        // -- string -> the Hash -=-> Data()pendingTransactions from current/new block)
        previousBlockHash: previousBlockHash,// Data from previous block, hashed into a single string
     };

     this.pendingTransactions = [];// All of the pendingTransactions are added into the new block, once it has been created and--
     // -- the newTransitions array should be cleared to start over for the next block
     this.chain.push(newBlock);// Takes this new block that is created and pushes it into the chain and adds it to the chain

     return newBlock;
}

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTranasction = function(amount, sender, recipient){
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    };
    this.pendingTransactions.push(newTransaction);// The newTransaction will be pushed to the pending transactions--
    // -- in the next created block

    return this.getLastBlock()['index'] + 1;// Return the number of the block where the new transaction will be recorded
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){
    // This fn will take a block from the block chain and hash it into a fixed length string
    // So this takes in a block data and returns a fixed length string, which is the hash of the data
    const dataAsString = previousBlockHash +nonce.toString() + JSON.stringify(currentBlockData);
    //  All of the data will be concatenated into a single string
    const hash = sha256(dataAsString);
    return hash;
}

module.exports = Blockchain;// To allow the test.js to create new blocks for testing