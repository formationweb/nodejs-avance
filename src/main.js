import express from 'express'
import database from './database.js'

const app = express()

app.use(express.json())

app.post('/users', (req, res, next) => {
    console.log(req.body)
    next(new Error('erreur'))
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use((err, req, res, next) => {
    res.status(500).send('Erreur')
})

app.listen(3000, () => {
    console.log('Serveur sur le port 3000')
})