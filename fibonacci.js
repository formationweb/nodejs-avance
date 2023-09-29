import { Worker } from 'worker_threads'


const worker = new Worker('./worker.js')

worker.on('message', (sum) => {
    console.log(sum)
})

worker.on('error', (err) => {
    console.log(err)
})

worker.on('exit', () => {
   
})


worker.postMessage(50)


worker.terminate() // 