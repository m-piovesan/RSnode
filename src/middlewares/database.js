/* 
    usar o # para evitar que arquivos externos possam mexer nessa classe...
    sinônimo ao static do C
*/

import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url) // função pra pegar o caminho até o arquivo

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    /* FUNÇÃO DE SELEÇÃO: recebe table como parâmetro, retorna os dados que estão nela */
    select(table) { 
        const data = this.#database[table] ?? []; // se não tiver nada, retorna array vazio

        return data;
    }

    /* FUNÇÃO DE INSERÇÃO: recebe a table e o valor a ser inserido nela */
    insert(table, data) { 
        // se já existe esse array na table, dá um push nas info que quer add
        if (Array.isArray(this.#database[table])) { 
            this.#database[table].push(data);
        } else { // senão, o array table vai ser criado, recebendo info
            this.#database[table] = [data];
        }
    
        this.#persist();
        return data;
    }
}