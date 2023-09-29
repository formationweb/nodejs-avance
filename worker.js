import { parentPort } from 'worker_threads'

function fibonacci(n) {
    if (n <=1) {
        return n
    }
    else {
        return fibonacci(n -1) + fibonacci(n - 2)
    }
}

parentPort.on('message', (nb) => {
    const sum = fibonacci(nb)
    parentPort.postMessage(sum)
})
