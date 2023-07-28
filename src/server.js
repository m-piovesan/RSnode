// const http = require('http') -> jeito "antigo" de importar (CommonJS)

import http from 'node:http' // jeito mais atualizado de importar (ESModules)
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    // route vai receber a rota correspondente à ação desejada
    const route = routes.find(route => {
        return route.method == method && route.path == url
    })
    
    // se a rota existir, executa a ação dela
    if (route) {
        return route.handler(req, res)
    }

    return res.writeHead(404).end();
})

server.listen(3333);