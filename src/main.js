import express from 'express'
import { db } from './database.js'
import Piscina from 'piscina'

const worker = new Piscina({
    filename: './src/database.js'
})

const app = express()

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

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('Erreur')
})

app.listen(3000, () => {
    console.log('Serveur sur le port 3000')
})