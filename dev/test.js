const BlockChain = require('./blockchain');

const bitcoin = new BlockChain();

bitcoin.createNewBlock(2389, '242W5R5W4Y4W5T', 'QR3T5342W65URDT6E5');


bitcoin.createNewTranasction(100, 'ALEXUI5E946E57U', 'JENNY6URTKI546R');// This perding transaction will be stored in next block

bitcoin.createNewBlock(5765, 'YA5QU4WUEYWUSE', 'WI7E5UEI7SE65USRHD');

bitcoin.createNewTranasction(100, 'ALEXUI5E946E57U', 'JENNY6URTKI546R');// These pending transactions will be stored in the--
bitcoin.createNewTranasction(1001, 'ALEXUI5E946E57U', 'JENNY6URTKI546R');// --newly created next block
bitcoin.createNewTranasction(10002, 'ALEXUI5E946E57U', 'JENNY6URTKI546R');

bitcoin.createNewBlock(3243, '45T46UE5YREY5E', 'Y466REYSU4SEI6EU46');

console.log(bitcoin.chain[2]);