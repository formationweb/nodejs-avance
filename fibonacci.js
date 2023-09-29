// 0, 1, 1, 2, 3, 5, 8

function fibonacci(n) {
    if (n <=1) {
        return n
    }
    else {
        return fibonacci(n -1) + fibonacci(n - 2)
    }
}

console.time()
setImmediate(() => {
    fibonacci(50)
})
console.log('ok')
console.timeEnd()
