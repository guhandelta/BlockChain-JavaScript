const BlockChain = require('./blockchain');

const bitcoin = new BlockChain();

console.log(bitcoin);


// bitcoin.createNewBlock(2389, '242W5R5W4Y4W5T', 'QR3T5342W65URDT6E5');


// bitcoin.createNewTranasction(100, 'ALEXUI5E946E57U', 'JENNY6URTKI546R');// This perding transaction will be stored in next block

// bitcoin.createNewBlock(5765, 'YA5QU4WUEYWUSE', 'WI7E5UEI7SE65USRHD');

// bitcoin.createNewTranasction(100, 'ALEXUI5E946E57U', 'JENNY6URTKI546R');// These pending transactions will be stored in the--
// bitcoin.createNewTranasction(1001, 'ALEXUI5E946E57U', 'JENNY6URTKI546R');// --newly created next block
// bitcoin.createNewTranasction(10002, 'ALEXUI5E946E57U', 'JENNY6URTKI546R');

// bitcoin.createNewBlock(3243, '45T46UE5YREY5E', 'Y466REYSU4SEI6EU46');



// const previousBlockHash = '987TGUOHY097T6R5E4W6SEE65R76T8Y8U';
// const currentBlockData = [
//     {
//         amount: 20,
//         sender: '87TY798T6FUYT6R75ERYTU68R7TU',
//         recipient: '897TUYI76T7U656ERTYT67TUG798',
//     },
//     {
//         amount: 30,
//         sender: 'ED6TY7YU8UIUY78UIY8UI8UI8U8Y',
//         recipient: '4ER56TYG78UIJHUGYT7Y8UI9UI',
//     },
//     {
//         amount: 20,
//         sender: 'CFDRYT687YUHYGUTFYIUOIJOU89Y7',
//         recipient: 'GFYR7T6YIU78TYGGUTFYHU8Y9OIP9',
//     },
// ];
// const nonce =  100;

// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));

// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 17201));

const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1563701709594,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1563701775771,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1563702205798,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "d4dac090ab9a11e985b8130dcdfa71ad",
    "transactionId": "fc6a02b0ab9a11e985b8130dcdfa71ad"
    },
    {
    "amount": 30,
    "sender": "SGRTWY5E6UR7ITD745EYREYX5S6R",
    "recipient": "YE5A36US7ID5736W4TYXUJR7IFSRY5E6",
    "transactionId": "b68b64e0ab9b11e985b8130dcdfa71ad"
    },
    {
    "amount": 120,
    "sender": "SGRE5YR6T7IYLJO;UYI7TUFYR56UT7IYOT7",
    "recipient": "FJYT7I6R5E456RUTIKY8756RY55E645UT7IY",
    "transactionId": "d27c41b0ab9b11e985b8130dcdfa71ad"
    },
    {
    "amount": 250,
    "sender": "SGRE5YR6T7IYLJO;UYI7TUFYR56UT7IYOT7",
    "recipient": "FJYT7I6R5E456RUTIKY8756RY55E645UT7IY",
    "transactionId": "e82b6770ab9b11e985b8130dcdfa71ad"
    }
    ],
    "nonce": 120466,
    "hash": "000042f9628b0a794becfa5fc51412e00d794576838c8ca457950def20544de1",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1563702354360,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "d4dac090ab9a11e985b8130dcdfa71ad",
    "transactionId": "fc9e1590ab9b11e985b8130dcdfa71ad"
    },
    {
    "amount": 300,
    "sender": "XHTSYW56RUYUT7RE5RSGXFGHFYHSRE5YRY",
    "recipient": "DHTEU5YRSRTE656YR7U365EYRSHTJYFI7R",
    "transactionId": "286d7260ab9c11e985b8130dcdfa71ad"
    },
    {
    "amount": 450,
    "sender": "W4365EY6RU7T6E5WT4SRTYDUR7TI",
    "recipient": "SW4T5EY65WTSRRGTYRUTDY4WTY4",
    "transactionId": "34d234f0ab9c11e985b8130dcdfa71ad"
    },
    {
    "amount": 600,
    "sender": "W365EYUR7546E5YWTSRYUR7IUTK7RU",
    "recipient": "SWT4635EY6RE5YSTRTW45YEU6RE5YTSRW4",
    "transactionId": "40233d90ab9c11e985b8130dcdfa71ad"
    },
    {
    "amount": 750,
    "sender": "W365EYUR7546E5YWTSRYUR7IUTK7RU",
    "recipient": "SWT4635EY6RE5YSTRTW45YEU6RE5YTSRW4",
    "transactionId": "452e7070ab9c11e985b8130dcdfa71ad"
    }
    ],
    "nonce": 2611,
    "hash": "0000a876496a37abebf18b2b6e62704f6fe061756cc6c5aa48cb944a4f6fed12",
    "previousBlockHash": "000042f9628b0a794becfa5fc51412e00d794576838c8ca457950def20544de1"
    },
    {
    "index": 5,
    "timestamp": 1563702399314,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "d4dac090ab9a11e985b8130dcdfa71ad",
    "transactionId": "552ab1a0ab9c11e985b8130dcdfa71ad"
    }
    ],
    "nonce": 36612,
    "hash": "0000c0af9c044bbfdda5a3d87867a1a8618706332ca382c5e770359e7c4ab7b3",
    "previousBlockHash": "0000a876496a37abebf18b2b6e62704f6fe061756cc6c5aa48cb944a4f6fed12"
    },
    {
    "index": 6,
    "timestamp": 1563702403450,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "d4dac090ab9a11e985b8130dcdfa71ad",
    "transactionId": "6ff62140ab9c11e985b8130dcdfa71ad"
    }
    ],
    "nonce": 97735,
    "hash": "000002baa4da9b547916861412c9049cf08624138ab501422e8e11cd2648467f",
    "previousBlockHash": "0000c0af9c044bbfdda5a3d87867a1a8618706332ca382c5e770359e7c4ab7b3"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "d4dac090ab9a11e985b8130dcdfa71ad",
    "transactionId": "726d3bc0ab9c11e985b8130dcdfa71ad"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }

    console.log("Valid: ",  bitcoin.chainIsValid(bc1.chain));