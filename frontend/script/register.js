async function register(){
    const name = document.getElementById('new-username').value
    const passcode = document.getElementById('new-password').value
    const confirmPasscode = document.getElementById('confirm-password').value

    

    if(!name || !passcode || !confirmPasscode){
        alert('preencha todas as informações')
        return '?'
    }

    if(passcode !== confirmPasscode){
        alert('as senhas não são iguais')
        return '?'
    }
    const userData = {
        name: name,
        passcode: passcode
    }

    try {
        const response = await fetch('/newUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        const data = await response.text()
        
        if (data === 'sucesso') {
            location = '/index.html';
        } else {
            alert(data)
        }
    }catch(error){
        alert('Erro na requisição: ' + error.message)
    }
}