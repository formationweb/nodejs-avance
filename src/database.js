import fs from 'fs'
import { parentPort, isMainThread } from 'worker_threads'

const FILE_PATH = './src/data/users.json'

let users

//if (!isMainThread) {
    users = new Array(1).fill(0).map(() => {
        return {
            id: Math.random(),
            name: 'tesat'
        }
    })
//}


function fibonacci(n) {
    if (n <= 1) {
        return n
    }
    else {
        return fibonacci(n - 1) + fibonacci(n - 2)
    }
}

class Database {
    /*constructor() {
        parentPort?.on('message', async (name) => {
            const users = await this.search(name)
            parentPort.postMessage(users)
        })
    }*/

    read(simulate = false) {
        if (simulate) {
            return users
        }
        return new Promise((resolve, reject) => {
            fs.readFile(FILE_PATH, 'utf-8', (err, data) => {
                if (err) reject(err)
                else resolve(!data ? [] : JSON.parse(data))
            })
        })
    }

    write(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), 'utf-8', (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    }

    async add(user) {
        const users = await this.read()
        users.push(user)
        await this.write(users)
    }

    async delete(id) {
        const users = await this.read()
        const usersModified = users.filter(user => user.id !== id)
        await this.write(usersModified)
    }

    async update(id, userData) {
        const users = await this.read()
        const usersModified = users.map(user => {
            if (id === user.id) {
                return {
                    ...user,
                    ...userData
                }
            }
            return user
        })
        await this.write(usersModified)
    }

    async search(name) {
        const users = await this.read(true)

        let indexChunk = 0
        let usersFiltered = []
        const CHUNK = 20000

        await new Promise((resolve, reject) => {
            function searchChunk() {
                fibonacci(40)
                console.log(indexChunk)
                for (let i = indexChunk; i < indexChunk + CHUNK; i++) {
                    const user = users[i]
                    if (user) {
                        if (user.name.startsWith(name)) {
                            usersFiltered.push(user)
                        }
                    }
                    else { // on sort de la boucle
                        resolve()
                        return
                    }
                }
                indexChunk += CHUNK
                setImmediate(searchChunk)
            }

            searchChunk()
        })

        return usersFiltered
    }
}

export const db =  new Database()

export default (name) => {
   return db.search(name)
}
