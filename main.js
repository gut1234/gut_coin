const fs = require('fs');
const data = fs.readFileSync('data.txt', 'utf8');

const {
    getAllUSerNames,
    isUserNameValid,
    isPasscodeValid,
    generateId,
    createTrasactionId,
    criptografePasscode,
    createConfirmationCode,
    getUserIdByname
} = require('./usefulFunctions');

class User {
    constructor(name , id , balance , passcode) {
        this.name = name
        this.id = id
        this.balance = balance
        this.passcode = passcode
    }
}
let users = []

function parseUserData() {
    const allUsersData = data.split(';');
    const nameRegExp = new RegExp('<userName>(.*?)</userName>');
    const idRegExp = new RegExp('<userId>(.*?)</userId>');
    const balanceRegExp = new RegExp('<balance>(.*?)</balance>');
    const passcodeRegExp = new RegExp('<passcode>(.*?)</passcode>');

    for (let i = 0; i < allUsersData.length - 1; i++) {
        let name = nameRegExp.exec(allUsersData[i]);
        let id = idRegExp.exec(allUsersData[i]);
        let balance = balanceRegExp.exec(allUsersData[i]);
        let passcode = passcodeRegExp.exec(allUsersData[i]);
        if (name && id && balance && passcode) {
            users.push(new User(name[1], id[1], balance[1], passcode[1]));
        } else {
            console.log(`Erro ao processar os dados do usuário no índice ${i}`);
        }
    }
}
parseUserData()


function newUser(userName , passcode){
  if(isUserNameValid(userName , users) && isPasscodeValid(passcode)){
    const id = generateId(userName)
    let userInfo = `\n<userName>${userName}</userName>:\n<userId>${id}</userId>,\n<balance>0</balance>,\n<passcode>${passcode}</passcode>,\n;`
    fs.appendFileSync('data.txt', userInfo)
  }else{
    console.log('Nome de usuário inválido')
  }
}

function createTransaction (senderName , receiverId , senderPasscode , value){
  let senderId = getUserIdByname(senderName , users)
  let transactionId = createTrasactionId(senderId , senderPasscode , receiverId , value)
  fs.appendFileSync('log.txt' , transactionId + `\n`)
}



