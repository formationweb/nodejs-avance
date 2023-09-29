import express from 'express'
import https from 'https'
import fs from 'fs'
import { db } from './database.js'
import Piscina from 'piscina'

const worker = new Piscina({
    filename: './src/database.js'
})

const app = express()

const options = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
}

const server = https.createServer(options, app)

app.use(express.json())

app.post('/users', async (req, res, next) => {
    try {
        await db.add(req.body)
        res.json({ ok: true })
    }
    catch (err) {
        next(err)
    }
})

app.put('/users/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        await db.update(id, req.body)
        res.json({ ok: true })
    }
    catch (err) {
        next(err)
    }
})

app.delete('/users/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        await db.delete(id)
        res.json({ ok: true })
    }
    catch (err) {
        next(err)
    }
})

app.get('/users', async (req, res, next) => {
    const name = req.query.name
    try {
       /* const users = await new Promise((resolve, reject) => {
            worker.postMessage(name)
            worker.on('message', resolve)
        })*/
        const users = await worker.run(name)
        res.json(users)
    }
    catch (err) {
        next(err)
    }
})

let  users

app.get('/', (req, res) => {
   /* users =  new Array(5e3).fill(0).map(() => {
        return {
            id: Math.random(),
            name: 'tesat'
        }
    })*/
    res.send('Hello')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('Erreur')
})

server.listen(3000, () => {
    console.log('Serveur sur le port 3000')
})