import express from 'express'
import database from './database'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Serveur sur le port 3000')
})