const fs = require('fs');
const data = fs.readFileSync('data/data.txt', 'utf8'); //dados dos usuarios

const {
    getAllUSerNames,
    isUserNameValid,
    isPasscodeValid,
    generateId,
    createTrasactionId,
    criptografePasscode,
    createConfirmationCode,
    getUserIdByname,
    parseUserData
} = require('./usefulFunctions'); //importa as funções globais


let users = parseUserData(data) // transforma os dados em um arquivo


function newUser(userName , passcode){ //cria um novo usuario e o registra no banco de dados
  if(isUserNameValid(userName , users) && isPasscodeValid(passcode)){ //verifica se o nome de usuario e a senha são válidos
    const id = generateId(userName) //cria o id daquele usuário
    let userInfo = `\n<userName>${userName}</userName>:\n<userId>${id}</userId>,\n<balance>0</balance>,\n<passcode>${passcode}</passcode>,\n;`
    fs.appendFileSync('data/data.txt', userInfo) //escreve as informações no novo usuario no banco de dados
  }else{
    console.log('Nome de usuário ou senha inválidos')
  }
}

function createTransaction (senderName , receiverId , senderPasscode , value){ //cria uma nova transação e a registra no log de transações sua validez será verificada com o minerador
  let senderId = getUserIdByname(senderName , users)
  let transactionId = createTrasactionId(senderId , senderPasscode , receiverId , value)
  fs.appendFileSync('data/log.txt' , transactionId + `\n`)
}

newUser('kaledo' , '223344')
createTransaction('marcos' , generateId('kaledo') , '123456' , 1)