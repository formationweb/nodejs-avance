import express from 'express'
import database from './database.js'

const app = express()

app.use(express.json())

app.post('/users', async (req, res, next) => {
    try {
        await database.add(req.body)
        res.json({ ok: true })
    }
    catch (err) {
        next(err)
    }
})

app.put('/users/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        await database.update(id, req.body)
        res.json({ ok: true })
    }
    catch (err) {
        next(err)
    }
})

app.delete('/users/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        await database.delete(id)
        res.json({ ok: true })
    }
    catch (err) {
        next(err)
    }
})

app.get('/users', async (req, res) => {
    const name = req.query.name
    try {
        const users = await database.search(name)
        res.json(users)
    }
    catch (err) {
        next(err)
    }
})

app.use((err, req, res, next) => {
    res.status(500).send('Erreur')
})

app.listen(3000, () => {
    console.log('Serveur sur le port 3000')
})