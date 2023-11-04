import express from 'express'
import bodyParser from 'body-parser'

import sequelize from './src/services/dbService.js'
import userRouter from './src/routes/userRoute.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        'message': 'API works'
    })
})


app.use('/user', userRouter)

sequelize.sync({alter: true}).then(() => {
    console.log("Sync succesfully")
}).catch((err) => {
    console.log(err)
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`App is running on http://localhost:${PORT}`)
})