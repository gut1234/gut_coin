window.addEventListener('load' , isLogged)

function isLogged(){
    const isLoggedIn =  sessionStorage.getItem('isLoggedIn')
    if(isLoggedIn == 'true'){
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('functions-container').classList.remove('hidden');
      } else {
        document.getElementById('login-container').classList.remove('hidden');
        document.getElementById('functions-container').classList.add('hidden');
      }
}

function login(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
      
      if (username && password) {
        // Em um sistema real, aqui seria feita uma requisição ao servidor para autenticar o usuário
        sessionStorage.setItem('isLoggedIn', 'true');
        isLogged();
      } else {
        alert('Por favor, insira as credenciais.');
      }
}

//função que puxa op balanço do servidor