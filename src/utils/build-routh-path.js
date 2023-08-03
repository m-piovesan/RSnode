/* regex: formas de encontrar um texto no meio de algo maior (ctrl + f) */
export function buildRouthPath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g // procurar tudo que começa com : seguido de uma letra que pode repitir
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    // ^ indica que precisa começar com esse valor, não apenas conter
    const pathRegex = new RegExp('^${pathWithParams}(?<query>\\?(.*))?$')

    return pathRegex
}