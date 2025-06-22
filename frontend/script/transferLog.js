let loggedUserName = sessionStorage.getItem('userName')
let UserTransactions
 
async function getUserTransactions() {
    try{
        const response = await fetch('/getUserTransactions',{
          method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({userName: loggedUserName})
        })
        UserTransactions = await response.json()
    
      }catch(error){
        console.error("Erro ao obter o saldo", error);
        alert('algo deu errado ;-;');
      }
      showUserTransactions()
}
function showUserTransactions() {
    const transactionLogContainer = document.querySelector(".transaction-log");

    // Limpa o container antes de adicionar novas transações
    transactionLogContainer.innerHTML = "";

    // Itera sobre cada transação no array e adiciona ao container
    UserTransactions.forEach(transaction => {
        // Cria o elemento div para a transação
        const transactionDiv = document.createElement("div");
        transactionDiv.classList.add("transaction");

        // Define o conteúdo HTML da transação
        transactionDiv.innerHTML = `
            <p>ID da Transação: <span class="transaction-id">#${transaction.id}</span></p>
            <p>Status: 
                <span class="transaction-status ${transaction.sucesso ? "success" : "failed"}">
                    ${transaction.sucesso ? "Sucesso" : "Falhou"}
                </span>
            </p>
            <p>Mensagem: <span class="transaction-message">${transaction.mensagem}</span></p>
        `;

        // Adiciona o elemento da transação ao container
        transactionLogContainer.appendChild(transactionDiv);
    });
}


getUserTransactions()