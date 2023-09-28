import fs from 'fs'

const FILE_PATH = './src/data/users.json'

class Database {
    read() {
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
        const users = await this.read()
        return users.filter(user => user.name.startsWith(name))
    }
}

export default new Database()