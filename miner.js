const fs = require('fs');
const data = fs.readFileSync('log.txt', 'utf8');

const trasactions = data.split(`\n`)

let balances = {
    gt1: 100000,
}



function validateTransaction(transactionId){
    //para uma transação ser válida ela precisa: saldo suficiente, id correto
    
}