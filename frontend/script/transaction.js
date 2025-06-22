async function makeTransaction() {
    const userName = sessionStorage.getItem('userName')
    const receiverId = document.getElementById('receiver-id').value
    const passcode =  document.getElementById('transaction-password').value
    const amount = document.getElementById('transaction-amount').value

    if(!userName){
        alert('faça login para realizar a transação')
        return
    }

    if(!receiverId || !passcode || !amount){
        alert('preencha todos os campos')
        return
    }

    const userData = {
        senderName: userName,
        receiverId: receiverId,
        senderPasscode: passcode,
        value: amount
    }

    try{
        const response = await fetch('/newTransaction' , {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })

        const result = await response.text()

        alert(result)

    }catch(error){
        console.error(error)
        alert('houve um erro ao processar sua transação')
    }
}