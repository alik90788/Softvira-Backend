const express = require('express')
const bodyparser = require('body-parser')
var cors = require('cors')

const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

app.use(cors())

const record = require('./routers/routes')

app.listen(5000, () => {
    console.log('Server Running')
})

app.use('/record', record)