import express from 'express'
import database from './database.js'

database.search('to').then(console.log)

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Serveur sur le port 3000')
})