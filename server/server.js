const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors');
app.use(cors());


const mainFilePath = path.join(__dirname , '..' , 'backend' , 'main.js')
const{newUser , createTransaction , validateLogin , getUserBalance} = require(mainFilePath)

app.use(express.static(path.join(__dirname, '..', 'frontend')))
app.use(express.json())

app.get('/' , (req , res)=> {
    const pathName = path.resolve(__dirname, '..', 'frontend', 'index.html')
    res.sendFile(pathName)
})

app.get('/transaction.html' , (req , res)=> {
    const pathName = path.resolve(__dirname, '..', 'frontend', 'transaction.html')
    res.sendFile(pathName)
})

app.get('/transfer-log.html' , (req , res) => {
    const pathName = path.resolve(__dirname, '..', 'frontend', 'transfer-log.html')
    res.sendFile(pathName)
})

app.get('/informations.html' , (req , res) => {
    const pathName = path.resolve(__dirname, '..', 'frontend', 'informations.html')
    res.sendFile(pathName)
})

app.get('/register.html' , (req , res) => {
    const pathName = path.resolve(__dirname, '..', 'frontend', 'register.html')
    res.sendFile(pathName)
})

app.post('/newUser' , (req , res) => {
    const {name , passcode} = req.body

    const result = newUser(name , passcode)
    res.send(result)
})

app.post('/login' , (req , res)=> {
    const {name , passcode} = req.body

    const result = validateLogin(name , passcode)
    res.json(result)

})

app.post('/getBalance' , (req , res) => {
    const {userName} = req.body
    const result = getUserBalance(userName)
    res.send(String(result))
})

app.listen(3300 , ()=>{
    console.log('app rodando na porta 3300')
})