const {
    getPasscodeByUserId,
    parseUserData,
    checkPasscodeValidity,
    parseTransactionId
} = require('./usefulFunctions') // importa as funções 

const fs = require('fs')
const transactionLog = fs.readFileSync('data/log.txt' , 'utf8') //log com todos os id de transações

const data = fs.readFileSync('data/data.txt' , 'utf8')
const users = parseUserData(data) //dados dos usuarios

const balances = { //contem apenas o saldo do usuário zero o que limita o numero de moedas
    gt001: 100000
}

function mine(){ // realiza a verificação de todas as transações atualiza o balanço e escreve no relatório de mineração
    fs.writeFileSync('data/lastMine.txt', '')
    const transactions = transactionLog.split('\n')
    let transactionsStatus
    for(let i = 0 ; i < transactions.length ; i++){
        const result = validateTransaction(transactions[i])
        if(result.result){
            updateBalance(transactions[i])
        }
        transactionsStatus += `${transactions[i]} sucess: ${result.result} message: ${result.message} \n`
    }
    fs.appendFileSync('data/lastMine.txt' , transactionsStatus)
    fs.appendFileSync('data/lastMine.txt' , 'balances: \n')
    fs.appendFileSync('data/lastMine.txt' , JSON.stringify(balances))
}

function validateTransaction(id) { //checa se uma transação é válida baseada em seu id
    const idParts = parseTransactionId(id)
    if (!idParts) {
        return { result: false, message: 'Invalid ID format' }; // Formato do transactionId inválido
    }

    const { senderId, senderPasscode, value, date } = idParts;

    // Verifica se o saldo é suficiente
    if (balances[senderId] == null) {
        return { result: false, message: 'Sender not found' };
    }

    if (balances[senderId] < value) {
        return { result: false, message: 'Insufficient balance' };
    }

    // Verifica se o passcode está correto
    const isPasscodeRight = checkPasscodeValidity(senderPasscode , senderId , users , date);
    if (!isPasscodeRight) {
        return { result: false, message: 'Invalid passcode' };
    }

    // Se todas as validações passarem
    return { result: true, message: 'Transaction is valid' };
}

function updateBalance(id){ // atualiza o saldo de acordo com a transação
    const idParts = parseTransactionId(id)
    const {senderId , receiverId , value} = idParts
    balances[senderId] -= value
    if(balances[receiverId]){
        balances[receiverId] += value
    }else{
        balances[receiverId] = value
    }
}

mine()