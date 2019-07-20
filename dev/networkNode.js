const express = require('express');
const app = express();
const bodyParser = require('body-parser');// To parse the body and make the params available to be retrieved and used
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');// All this library does is that, it creates a unique random string with -, which can be used as a n/w node's address 
const port = process.argv[2];// Access the 2nd var{port} in the scripts: -> package.json
const rp = require('request-promise');

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
// This endpoint will be hit during a broadcast, to receive teh newTransaction and add it to the pendingTransaction[] of that node
app.post('/transaction', function(req,res){
    // Whenever, this endpoint recieves the newTransaciton, all that needs to be done is just to push it into-- 
    // --the pendingTransactions[] of the node, that recieved this call
    const newTransaciton = req.body; //  This is done here to store the newTransaction, sent to this endpoint as the entire body of teh req
    const blockIndex = bitcoin.addTransactionsToPendingTransactions(newTransaciton);
    res.json({note: `The new transaction will be added to the block ${blockIndex}.`});
});

// Create a new Transaction and Broadcast it to all the other nodes in the network
app.post('/transaction/broadcast', function(req,res){
    //========================> Create a New Transaction <========================
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    // Add this transaction to the Pending Transactions, on this node, in the network
    bitcoin.addTransactionsToPendingTransactions(newTransaction);

    //========================> Broadcast the  New Transaction <========================
    // Broadcast the new transaction to all the available nodes in the network, by looping through the networkNodes and network node urls--
    // -- and making requests to the transaction endpoint('/transaction') on all the other nodes in the network
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            url: networkNodeUrl + '/transaction', // Requesting the /transaction endpoint of evey node
            method: 'POST', // Send the in a Post req
            body: newTransaction, // Send the newTransaction, as the entire body of the request
            json: true // The data is to be sent as JSON
        };
        requestPromises.push(rp(requestOptions));
        // After the completion of the forEach(), all of these requests will be populated in the requestPromises[]
    });
    // Run all of the requests, by passing in the array of requests
    Promise.all(requestPromises)
        .then(data =>{
            // Now is data will not be touched here, as the broadcast is already complete, so just sending a response as the broadcast was successful
            res.json({note:'Transaction Created and Broacasted Successfully!!'});
            // This response will be sent after the broadcast is complete and all the nodes in the network are updated about the newTransaction
        })
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

// The endpoint that will register the new node(with itself) and broadcast it to the entire network
app.post('/register-and-broadcast-node', function(req,res){
    
    // ======================> Registeration <======================
    // Pass in the url of the node that needs to be registered
    const newNodeUrl = req.body.newNodeUrl;
    // To register the new node with this/current node, the url should be added in the networkNodes[] 
    // Push the URL into the array
    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

    // ======================> Broadcasting <======================
    // Broascasting here, will be done by calling the /request-node endpoint of every node in the network
    const regNodesPromises = [];// Array to store all the promises received for rp(requestOptions) call
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            url: networkNodeUrl + '/register-node', // Request/ping the /register-node endpoint of evey node
            method: 'POST', // Send the in a Post req
            body: {newNodeUrl: newNodeUrl},
            json: true // The data is to be sent as JSON
        };
        // rp(requestOptions); will return a promise and in this case will return many promises as the request is made with multiple nodes
        regNodesPromises.push(rp(requestOptions));// All of the req made to the node will be asynchronous => time to calc the data(requestOptions) is unknown--
        // -- as the fn() is trying to reach an outside source (i.e.) the other nodes in the network and since the time taken is unknown, every result obtained--
        // -- is pushed into the regNodesPromises[]
    });
    Promise.all(regNodesPromises)// will run every single request in regNodesPromises[] and after all the req are done--
        .then(data =>{// --can use all the data, got back from them
            const bulkRegisterOptions = {
                url: newNodeUrl + '/register-nodes-bulk', // register-bulk is used here, to rp(requestOptions) in the forEach will return many node url
                method: 'POST',
                body: {allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},// this [] will have the url of all the nodes in n/w
                // ... operator is used here to spread the elements of networkNodes[], in allNetworkNodes[], rather than plaing an array in another
                json: true
            };
            return rp(bulkRegisterOptions);
        })
            .then(data =>{// Last step in this endpoint is to send a response back to what called it
                res.json({note: 'New Node registered with the network successfully'}); 
            })

});

// Endpoint to register a node with the network(that the node already knows), by accepting the new node registered and broadcasted
// This endpoint is only for the old nodes to register new nodes. If they also start to broadcast the new node to be added, it will severly degrade--
// -- the performace of the blockhain n/w and lead to an infinite loop => totally crash the blockchain
// So when other nodes recieve new node's URL, just register and not broadcast
app.post('/register-node', function(req,res){
    //This is the end point in every node that will recieve the broadcast that is sent out by /register-and-broadcast-node endpoint     
        const newNodeUrl = req.body.newNodeUrl;// Take the newNodeUrl(URL of the node, that is to be registered in the network) sent in the body and save it    
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
        if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);// Register the node into the network, by pushing the URL of the new node, into the networkNodes[]
        res.json({note : 'New node successfully registered.'});
});

// Register multiple nodes at once 
// This endpont will be called when the node from the network, which was reached out by the new node for registeration, send the url info about--
// -- all the other nodes already in the network, so this new node can register the url of all the other nodes already in the network and recognize the nodes
// When this process is complete, all of the nodes will be a part of the decentralized network and will be registered with each other
// This fn() will be accepting the data contans the url of all the nodes already present in the network and register all these nodes with new nodes
// New node is the only node, where this endpoint is hit, when the node is being added to the network
app.post('/register-nodes-bulk', function(req,res){
    // All of the node urls of the nodes, currently in the network, are being passed in as data
    const allNetworkNodes = req.body.allNetworkNodes;// This can be accessed, as it is passed in the body, when this endpoint is called
    allNetworkNodes.forEach(networkNodeUrl =>{ // Loop through the array of Node Urls and register each of em with the current node/New node
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if(nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
    });
    // Once this forEach() completed successfully, all the existing nodes will be registered with the new node, so return a success msg
    res.json({ note: 'Bulk registration successful.'});

});

app.listen(port, function(){
    console.log(`Listening on port ${port}......`);
}); 