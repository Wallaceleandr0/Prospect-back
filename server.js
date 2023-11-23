var app = require('./src/app.js')
require('dotenv').config()

const cors = require('cors')

var morgan = require('morgan')

app.use(morgan('dev'))

app.use(cors())

const PORT = 4000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})