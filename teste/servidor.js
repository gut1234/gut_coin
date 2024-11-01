const escreve = require('./backend')
const express = require('express')
const app = express()

app.get('/' , (req , res) =>{
    res.sendFile(__dirname + '/teste.html')
})

app.use(express.json())

app.post('/teste' , (req , res)=>{
    const {texto1 , texto2 , texto3} = req.body
    let result  = escreve(texto1 , texto2 , texto3)
    res.send(result)
})

app.listen(3300 , ()=>{
    console.log('gg')
})