const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];// To have access to the current Node's URL, to assign it to the Blockchain 
const uuid = require('uuid/v1');

function Blockchain(){
    this.chain = [];
    this.pendingTransactions = [];// All thh transactions here, are not recorded. THey get validates and recorded in the blockchain--
    // --when a new block is created

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];//This array will be filled with the other network nodes, so all the nodes would be aware of the other nodes in the n/w

    // Generating a Genesis Block(the 1st block of a blockchain) with arbitrary values
    this.createNewBlock(100,'0','0');
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

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
        transactionId: uuid().split('-').join("")
    };
    
    return newTransaction;
}

Blockchain.prototype.addTransactionsToPendingTransactions = function(transactionObj){
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock()['index'] + 1;// Return the index of the block, that this transaction will be added to
}

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    // This fn will take a block from the block chain and hash it into a fixed length string
    // So this takes in a block data and returns a fixed length string, which is the hash of the data
    const dataAsString = previousBlockHash +nonce.toString() + JSON.stringify(currentBlockData);
    //  All of the data will be concatenated into a single string
    const hash = sha256(dataAsString);
    return hash; 
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
    // Repeatedly run hashBlock() until it finds the correct Hash(with the same 4 bits in the begninning)
    // Uses previous block hash and current block data and continuously change the nonce, until the correct hash is found
    // Return the nonce value that gave the correct hash
    let nonce =0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while(hash.substring(0,4)!=='0000'){
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;// Return the nonce that generated the current hash, which in this case starts with 0000. ==> None is the proof of work

}

module.exports = Blockchain;// To allow the test.js to create new blocks for testing