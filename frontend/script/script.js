window.addEventListener('load' , isLogged)

let loggedUserName = sessionStorage.getItem('userName') //variavel global de nome de usuário

function isLogged(){ //function que checa se o usário está logado naquela sessão
    const isLoggedIn =  sessionStorage.getItem('isLoggedIn')
    loggedUserName = sessionStorage.getItem('userName')
    if(isLoggedIn == 'true'){ //caso sim o usuário terá acesso ao sistema
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('functions-container').classList.remove('hidden');
        getBalance()
      } else { //caso não aparece o formulário de login
        document.getElementById('login-container').classList.remove('hidden');
        document.getElementById('functions-container').classList.add('hidden');
      }
}

async function login(){ //função que valida o login
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(!username || !password){ //checa se todas as informações foram, fornecidas
      alert('Por favor, insira as credenciais.')
      return
    }
    const userData = {
      name: username,
      passcode: password
    }
    try { //realiza a consulta ao servidor para verificar se o login é válido
      const response = await fetch('/login', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
      })

      const result = await response.json() //resultado da consulta

      if (!result.result) { // se a consuilta falhou exibe a menssagem ao usuário
          alert(result.message)
          return
      }

      sessionStorage.setItem('isLoggedIn', 'true') // registra que o login foi efetuado
      sessionStorage.setItem('userName' , userData.name) //registra o nome do usuário
      loggedUserName = userData.name

      isLogged()

    }catch(error) {
      console.error("Erro ao tentar fazer login:", error);
      alert(error);
  }
}

async function getBalance(){ //função que puxa op balanço do servidor
  const $balance = document.getElementById('user-balance')
  try{
    const response = await fetch('/getBalance',{
      method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({userName: loggedUserName})
    })
    const result = await response.text()
    $balance.innerHTML = result

  }catch(error){
    console.error("Erro ao obter o saldo", error);
    alert('algo deu errado ;-;');
  }
}

function logout() {
  // Remover dados de sessão armazenados
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('userName');
  loggedUserName = null;
  window.location.href = '/index.html'
}
