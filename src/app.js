var express = require('express')
var app = express()

const cors = require('cors')
app.use(cors())


app.use(express.urlencoded({ extended: true }));

var connection = require('../infra/connection.js')

app.use(express.json())

app.get('/clientes', (req, res) => {
    const sql = `SELECT * FROM clientes;`
    connection.query(sql, (error, result) => {
        if (error) {
            console.log('Erro ao acessar os dados de clientes')
            res.status(404).json({ "erro": error })
        } else {
            res.status(200).json(result)
        }
    })
})

app.post('/enviar', (req, res) => {
    console.log(req)
    const { name, whatsapp, email, link } = req.body
    const sql = `INSERT INTO clientes(clientes_nome, clientes_whatsapp, clientes_email, clientes_link) VALUES('${name}', '${whatsapp}', '${email}', '${link}');`
    connection.query(sql, (error, result) => {
        if (error) {
            console.log("Deu erro", error)
            res.status(400).json({ "error": error })
        } else {
            res.status(201).json(result)
        }
    })
})

app.put('/status/:id/:status', (req, res) => {
    const id = req.params.id
    let status = req.params.status
    status = status == 0 ? 1 : 0
    const sql = `UPDATE clientes SET clientes_status = ${status} WHERE idclientes = ${id}`
    connection.query(sql, (error, result) => {
        if (error) {
            console.log("Deu erro", error)
            res.status(400).json({ "error": error })
        } else {
            res.status(201).json(result)
        }
    })
})

app.delete('/deletar/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM clientes WHERE idclientes = ${id}`
    connection.query(sql, (error, result) => {
        if (error) {
            console.log(`Deu erro ao tentar deletar o usuário: ${error}`)
            // criar status quando o login não é feito com sucesso
            res.status(500).json({ "error": error })
        } else {
            console.log(`Usuário excluído com sucesso!`)
            res.status(200).json(result)
        }
    })
})

// Criar put..

module.exports = app