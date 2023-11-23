var mysql = require('mysql')


require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
})

connection.connect((err) => {
    if(err) {
        console.log(`Deu erro aqui => ${err}`)
    } else {
        console.log('Banco de dados conectado com sucesso!')
    }
})
    

module.exports = connection