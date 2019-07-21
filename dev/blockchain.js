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
    this.createNewBlock(100,"0","0");
};

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
};

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
        transactionId: uuid().split('-').join("")
    };
    
    return newTransaction;
};

Blockchain.prototype.addTransactionsToPendingTransactions = function(transactionObj){
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock()['index'] + 1;// Return the index of the block, that this transaction will be added to
};

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    // This fn will take a block from the block chain and hash it into a fixed length string
    // So this takes in a block data and returns a fixed length string, which is the hash of the data
    const dataAsString = previousBlockHash +nonce.toString() + JSON.stringify(currentBlockData);
    //  All of the data will be concatenated into a single string
    const hash = sha256(dataAsString);
    return hash; 
};

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

};

// Method to validate othre chains inside the Network, when comparing with the chain hosted on the current node
Blockchain.prototype.chainIsValid = function(blockchain){
    // Validating the blockchain to check to see if it is legitimate, is done by iterating through all the blocks in the chain and see if the hashes line up correctly
    let validChain = true;
    for(var i=1; i<blockchain.length;i++){
        const currentBlock = blockchain[i];
        const previousBlock = blockchain[i-1];
        // // Chekcing if the block has correct data is done by rehashing the current block and check to see if the hash begins with "0000"
        const blockHash = this.hashBlock(
            previousBlock['hash'],
            { transactions: currentBlock['transactions'], index: currentBlock['index']}, 
            currentBlock['nonce']
            );
        if(blockHash.substring(0,4) !== "0000") validChain = false;
        // Checking if the hashes are in order
        if(currentBlock['previousBlockHash'] !== previousBlock['hash']) validChain = false;
        
        console.log('PreviousBlockHash ==>', previousBlock['hash']);
        console.log('CurrentBlockHash ==>', currentBlock['hash']);
    };

    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock['nonce'] === 100;
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] === '0';
    const correctTransaction = genesisBlock['transactions'].length === 0;

    if(!correctNonce || !correctHash || !correctPreviousBlockHash || !correctTransaction) validChain = false;

    return validChain;
    
};

Blockchain.prototype.getBlock = function(blockHash){
    let correctBlock = null;
    // Iterate through the Blockchain and find out & return the corresponsing block for the blockHash providd
    this.chain.forEach(block => {
        if(block.hash === blockHash) correctBlock = block;
    });
    return correctBlock; 
};

Blockchain.prototype.getTransaction = function(transactionId){
    // Iterate through the Blockchain and find out & return the corresponding Transaciton for the transacionId provided
    let correctTransaction = null;
    let correctBlock = null;

    this.chain.forEach(block => {
        block.transactions.forEach( transaction => {
            if(transaction.transactionId === transactionId){
                correctTransaction = transaction;
                correctBlock = block; // Accesible from the outer forEach() loop
            };
        });
    });

    return {
        transaction: correctTransaction,
        block: correctBlock
    };
}

Blockchain.prototype.getAddressData = function(address){
    const addressTransactions = [];
    this.chain.forEach(block =>{
        block.transactions.forEach(transaction =>{
            if(transaction.sender === address || transaction.recipient === address){
                addressTransactions.push(transaction);
            };
        });
    });
    let balance = 0;
    addressTransactions.forEach(transaction =>{
        if(transaction.recipient === address) balance += transaction.amount;
        else if(transaction.sender === address) balance -= transaction.amount;
    });
    return {
        addressTransactions: addressTransactions,
        addressBalance: balance
    };
}

module.exports = Blockchain;// To allow the test.js to create new blocks for testing