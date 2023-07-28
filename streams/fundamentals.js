// streams

// process.stdin.pipe(process.stdout) -> estou lendo algo e dando a mesma coisa como saída

import { Readable, Writable, Transform } from 'node:stream'

class oneToHundredStream extends Readable { // classe de leitura 
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => { // seta um timer de uma ação a cada meio segundo (500)
            if(i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }

        }, 500)
    }
}

class inverseNumber extends Transform {
    _transform(chunck, encoding, callback) {
        const transformed = Number(chunck.toString()) * -1

        callback(null, Buffer.from(String(transformed))) // 1st parametro: o que retorna se der erro, 2nd: retorno se não der
    }
}

class multiplyStreamByTen extends Writable {
    _write(chunck, encoding, callback) {
        console.log(Number(chunck.toString()) * 10)
        callback()
    }
}

new oneToHundredStream() // stream de leitura só consegue ler dados, não manipula, não faz nada
    .pipe(new inverseNumber()) // stream de transform obrigatoriamente precisa receber dados de algum lugar e jogar em outro
    .pipe(new multiplyStreamByTen()) // stream de escrita só escreve, não retorna nada