const express = require('express');
const app = express();
const bodyParser = require('body-parser');// To parse the body and make the params available to be retrieved and used
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');// All this library does is that, it creates a unique random string with -, which can be used as a n/w node's address 

const nodeAddress = uuid().split('-').join(""); // what this does is split the string by '-' and join it with emmpty string, into a complete string
// All this does is generate a randoms string, that is guaranteed to be unique, to a very high %. This is to make sure that 2 nodes don't have same address--
// -- same addresses for 2 nodes => the bitcoins may/will be sent to wrong recipient/address

const bitcoin = new Blockchain();
 
// If a request comes in with json or form data, we just gotta parse that data, so it can be used in any of the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain', function(req,res){
    res.send(bitcoin);
});

app.post('/transaction', function(req,res){
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({Note:`Transaction will be added to the block ${blockIndex}`});
});

// This will mine and create a new block, by performing a new block
app.get('/mine', function(req,res){
    // Obtaining the 3 parameters for the createNewBlock()
    // 1) Obtaining previousBlockHash 
    const lastBlock = bitcoin.getLastBlock();// getLastBlock() is called, as the last block of the chain is the prev block for this new block
    const previousBlockHash = lastBlock['hash']; 
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,// obtaining the transactions for/to be stored in the new block
        index: lastBlock['index'] + 1
    };
    
    // 2) To obtain a Nonce, the proof of work must be done
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

    // 3) Hash of the new Block
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    // Everytime someone mines a new block, they get a prize/reward of bitcoins(12.5 as per 2018)
    bitcoin.createNewTransaction(12.5, "00",nodeAddress );// By giving sender address as 00, whenever, looking at transactions, it could be inferred as, the transactions from--
    // -- the address 00 is a mining reward

    // The reward will be sent to the current node
    // This entire APU file may be treated as a network node, in the bitcoin blockchain - multiple instances of this api may act as different network nodes--
    // -- in the bitcoin blockchain => whenever any of the endpoints's are hit, the user is always communicating with this one network node

    // This fn() requires 3 params => Nonce, previousBlockHash, Hash
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    // Response for mining the new block
    res.json({
        note: "New Block Mined Successfully",
        block: newBlock// Displaying this to the user will not affect the chain in anyway, 
        // This is just to show the person who created/mined the block, to see/know how it looks like 
    });
});

app.listen(3000, function(){
    console.log("Listening on port 3000......");
});