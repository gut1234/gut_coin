const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y','z']
function getAllUSerNames(users){
    let usersNames = [];
  
    for(let i = 0 ; i < users.length ; i++){
      usersNames.push(users[i]['name'])
    }
  
    return usersNames
}

function isUserNameValid(userName , users){
    const regExpEspCrs = new RegExp('^[a-zA-Z]+$', 'g')
    if(getAllUSerNames(users).includes(userName) === false && userName.match(regExpEspCrs) !== null){
      return true
    }else{
      return false
    }
}

function isPasscodeValid(passcode){
    const regExpEspCrs = new RegExp('^[a-zA-Z0-9]+$', 'g')
    if(passcode.match(regExpEspCrs) !== null){
      return true
    }else{
      return false
    }
}

function generateId(userName){
    let id ='gt'
    let random = String(Math.random()).slice(2,5)
    let arrName = Array.from(userName)
    arrName.forEach((letter) =>{
      id += alphabetArray.indexOf(letter.toLowerCase())
    })
    id += random
    return id
   
}

function createTrasactionId(senderId , senderPasscode, receiverId, value){
    //o id de transação é o id do remetente + senha do remetente criptografada de acordo com a hora + o id do destinatário + valor da transação + a data + os digitos de confirmação
    let criptoPasscode = criptografePasscode(senderPasscode)
    let date = new Date();
    let fullDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}/${date.getHours()}/${date.getMinutes()}/${date.getSeconds()}`
  
  let confirmationCode = createConfirmationCode(senderId , criptografePasscode, receiverId)
    let id = `${senderId}-${criptoPasscode}-${receiverId}-${value}-${fullDate}-${confirmationCode}`
    return id
}

function criptografePasscode(passcode){
    //transformar todos o digitos da senha em numero
    let numberPasscode = ''
    let formatedpasscode = passcode.replace(/\s+/g, '').toLowerCase();
    let arrPasscode = Array.from(formatedpasscode)
    arrPasscode.forEach(character =>{
      let digit = character
      if(isNaN(digit)){
        digit = alphabetArray.indexOf(digit)
      }
      numberPasscode += digit
    }
        )
    numberPasscode = Number(numberPasscode)
   //obtem a data atual
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
  
    //formula para criptografar senha: Math.floor((mês(senha+ano)+hora(senha-minuto))/(dia * segundo))
    let criptografedPasscode = Math.floor((month*(numberPasscode+year)+hour*(numberPasscode-minute))/((day*second)+1))
    return criptografedPasscode
}

function createConfirmationCode(senderId , criptografePasscode, receiverId){
    let index1 = senderId[2] || 0
    let index2 = senderId[3] || 0
    let confirmationCode = `${String(criptografePasscode)[index1]}${String(receiverId)[index2]}`
    return confirmationCode
}

function getUserIdByname(name , users){
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            return users[i].id; // Retorna o ID do usuário se o nome for encontrado
        }
    }
    console.log(`Usuário com o nome "${name}" não encontrado.`);
    return null; 
}

module.exports = {
    getAllUSerNames,
    isUserNameValid,
    isPasscodeValid,
    generateId,
    createTrasactionId,
    criptografePasscode,
    createConfirmationCode,
    getUserIdByname
};
