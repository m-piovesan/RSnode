import { buildRouthPath } from '../utils/build-routh-path.js';
import { Database } from './database.js'
import { randomUUID } from 'node:crypto';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRouthPath('/users'),
        handler: (req, res) => {
            const { search } = req.query

            const users = database.select('users', search ? {
                name: search,
                email: search,
            } : null)
            
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRouthPath('/users'),
        handler: (req, res) => {
            const { name, email } = req.body
            
            const user = {
                id: randomUUID(),
                name,
                email,
            }

            database.insert('users', user);

            return res.writeHead(201).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRouthPath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            
            database.delete('users', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRouthPath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { name, email } = req.body
            
            database.update('users', id, {name, email})

            return res.writeHead(204).end()
        }
    }
]