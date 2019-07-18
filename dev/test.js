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