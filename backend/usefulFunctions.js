const alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y','z']

class User { //constructor para criar um novo usuário
    constructor(name , id , balance , passcode) {
        this.name = name
        this.id = id
        this.balance = balance
        this.passcode = passcode
    }
}

function getAllUSerNames(users){ //função que retorna um array de todos os nomes de usuários já usados
    let usersNames = [];
  
    for(let i = 0 ; i < users.length ; i++){
      usersNames.push(users[i]['name'])
    }
  
    return usersNames
}

function isUserNameValid(userName , users){ //verifica se um novo nome de usuário é válido, para ele ser válido e necessário ser composto apenas por letras e não ter sido usado antes
    const regExpEspCrs = new RegExp('^[a-zA-Z]+$', 'g')
    if(getAllUSerNames(users).includes(userName) === false && userName.match(regExpEspCrs) !== null){
      return true
    }else{
      return false
    }
}

function isPasscodeValid(passcode){ //verifica se uma nova senha é valida para ela serr válida é necessário que ela seja composta apenas por letras e números
    const regExpEspCrs = new RegExp('^[a-zA-Z0-9]+$', 'g')
    if(passcode.match(regExpEspCrs) !== null){
      return true
    }else{
      return false
    }
}

function generateId(userName){ //gera um novo id para um novo usuário. o id é compostopelo prefixo padrão gt, digitos aleatórios e uma versão de apenas números no userName
    let id ='gt'
    let random = String(Math.random()).slice(2,5)
    let arrName = Array.from(userName)
    arrName.forEach((letter) =>{
      id += alphabetArray.indexOf(letter.toLowerCase())
    })
    id += random
    return id
   
}

function parseUserData(data) { //faz um array com todos os usuarios
    let users = []
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
      return users;
}

function parseTransactionId(){

}

function createTrasactionId(senderId , senderPasscode, receiverId, value, Sdate){
    //o id de transação é o id do remetente + senha do remetente criptografada de acordo com a hora + o id do destinatário + valor da transação + a data + os digitos de confirmação
    let criptoPasscode = criptografePasscode(senderPasscode)
    let date = Sdate || new Date();
    let fullDate = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}/${date.getHours()}/${date.getMinutes()}/${date.getSeconds()}`
  
  let confirmationCode = createConfirmationCode(senderId , criptografePasscode, receiverId)
    let id = `${senderId}-${criptoPasscode}-${receiverId}-${value}-${fullDate}-${confirmationCode}`
    return id
}

function criptografePasscode(passcode, sDate){
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
    let date = sDate || new Date()
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

function createConfirmationCode(senderId , criptografePasscode, receiverId){ //cria um códico de confirmação para o id de transação
    console.log(senderId)
    let index1 = Math.random()[2]
    let index2 = Math.random()[2]
    let confirmationCode = `${String(criptografePasscode)[index1]}${String(receiverId)[index2]}`
    return confirmationCode
}

function getUserIdByname(name , users){ // retorna o id de um node de usuário existente
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
            return users[i].id; // Retorna o ID do usuário se o nome for encontrado
        }
    }
    console.log(`Usuário com o nome "${name}" não encontrado.`);
    return null; 
}

function getPasscodeByUserId(userId , users) { 
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            return users[i].passcode; // Retorna a senha do usuário se o ID for encontrado
        }
    }
    return null;
}

function checkPasscodeValidity(passcode,userId ,users , date){ // checa se a senha no id de transação é igual a senha no banco de dados
    const realPasscode = getPasscodeByUserId(userId , users)
    const [year, month, day, hours, minutes, seconds] = date.split('/');

    // Lembre-se que o mês no JavaScript é baseado em zero, então subtraímos 1 do valor do mês
    const sDate =  new Date(year, month - 1, day, hours, minutes, seconds);
    const realCriptografedPasscode = criptografePasscode(realPasscode , sDate)
    return realCriptografedPasscode == passcode
}

function parseTransactionId(id){
    const separetedId = id.split('-');
    if (separetedId.length !== 6) {
        return false; // Confere se o id possui todos os elementos
    }
    return {
        senderId: separetedId[0],
        senderPasscode: separetedId[1],
        receiverId: separetedId[2],
        value: separetedId[3],
        date: separetedId[4],
        confirmationCode: separetedId[5]
    };
}

module.exports = {
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
    checkPasscodeValidity,
    parseTransactionId
};

