const fs = require('fs');
const data = fs.readFileSync('data/data.txt', 'utf8'); //dados dos usuarios
const mineLog = fs.readFileSync('data/lastMine.txt' , 'utf8')

const {
    getAllUSerNames,
    isUserNameValid,
    isPasscodeValid,
    generateId,
    createTrasactionId,
    criptografePasscode,
    createConfirmationCode,
    getUserIdByname,
    parseUserData,
    getPasscodeByUserId,
    getBalances
} = require('./usefulFunctions'); //importa as funções globais


let users = parseUserData(data) // transforma os dados em um arquivo


function newUser(userName , passcode){ //cria um novo usuario e o registra no banco de dados
  if(isUserNameValid(userName , users) && isPasscodeValid(passcode)){ //verifica se o nome de usuario e a senha são válidos
    const id = generateId(userName) //cria o id daquele usuário
    let userInfo = `\n<userName>${userName}</userName>:\n<userId>${id}</userId>,\n<balance>0</balance>,\n<passcode>${passcode}</passcode>,\n;`
    fs.appendFileSync('data/data.txt', userInfo) //escreve as informações no novo usuario no banco de dados
    return 'sucesso'
  }else{
    return 'Nome de usuário ou senha inválidos'
  }
}

function createTransaction (senderName , receiverId , senderPasscode , value){ //cria uma nova transação e a registra no log de transações sua validez será verificada com o minerador
  let senderId = getUserIdByname(senderName , users)
  let transactionId = createTrasactionId(senderId , senderPasscode , receiverId , value)
  fs.appendFileSync('data/log.txt' , transactionId + `\n`)
}

function validateLogin(name , passcode){ //função que verifica se a tentativa de login é válida
  const allNames = getAllUSerNames(users)
  if(!allNames.includes(name)){ //verifica se aquele nome está incluso na database
    return {result: false , message: 'nome de usuário não encontrado'}
  }
  const userId = getUserIdByname(name , users)
  const userPasscode = getPasscodeByUserId(userId , users) //coleta os dados reais do usuário

  if(passcode == userPasscode){ //verifica se os dados fornecidos são verdadeiros
    return {result: true , message: 'sucesso'}
  }else{
    return {result: false , message: 'senha incorreta'}
  }
}

function getUserBalance(userName){ 
  const balances = getBalances(mineLog)
  const userId = getUserIdByname(userName , users)
  if(!balances){
    return 'erro'
  }
  if(!balances[userId]){
    return 0
  }
  return balances[userId]
}


module.exports = {
  newUser,
  createTransaction,
  validateLogin,
  getUserBalance
}