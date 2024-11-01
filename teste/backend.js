const fs = require('fs')

function escreve(texto1 , texto2 , texto3){
    fs.appendFileSync('test.txt' , texto1 + texto2 + texto3)
    return 'escrito'
}

module.exports = escreve