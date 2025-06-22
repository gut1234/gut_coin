let userInformations
let loggedUserName = sessionStorage.getItem('userName')
async function getUserInformations(){
    try{
        const response = await fetch('/getUserInformations',{
          method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({userName: loggedUserName})
        })
        userInformations = await response.json()
    
      }catch(error){
        console.error("Erro ao obter as informações", error);
        alert('algo deu errado ;-;');
      }
      showUserInformations()
}

function showUserInformations(){
    let userNameDiv =  document.getElementById('user-name')
    let userIdDiv =  document.getElementById('user-id')
    let userBalanceDiv =  document.getElementById('user-balance')

    userNameDiv.innerHTML = loggedUserName
    userIdDiv.innerHTML = userInformations.userId
    userBalanceDiv.innerHTML = userInformations.userBalance
}
getUserInformations()