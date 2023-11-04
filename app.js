import express from 'express'
import bodyParser from 'body-parser'

import sequelize from './src/services/dbService.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        'message': 'API works'
    })
})

sequelize.authenticate().then(() => {
    console.log("Succesfull conection")
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`App is running on http://localhost:${PORT}`)
})