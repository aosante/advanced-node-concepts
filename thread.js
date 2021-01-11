require('dotenv').config()
process.env.UV_THREADPOOL_SIZE
const http = require('http')
const bcrypt = require('bcrypt')

// Default = 3600 req/sec (more below)

// UV_THREADPOOL_SIZE=1 | 1030 req/sec
// UV_THREADPOOL_SIZE=2 | 2000 req/sec
// UV_THREADPOOL_SIZE=3 | 2900 req/sec
// UV_THREADPOOL_SIZE=3 | 3500 req/sec

/* Increasing the threadpool size increasaes performance because intel processors come with hyperthreading 
which  in essence makes 1 pysical core = 2 logical cores */

http.createServer((_, res) => {
    // 2 is the salt to be used
    bcrypt.hash('data to be encrypted', 2).then(hash => {
        res.writeHead(200, {'Content-Type': 'text-plain'})
        res.write(hash)
        res.end()
    })
}).listen(1337)

// run ab -n 100 -c 10 "http://localhost:1337/" for benchmarking
// when running 100 requests, we get around 2250 requests per second
// if number of requests is bumped up to 1000, then we around 3420 requests per second (50% increase)