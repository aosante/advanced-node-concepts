const http = require('http')
const bcrypt = require('bcrypt')

http.createServer((_, res) => {
    // 2 is the salt to be used
    bcrypt.hash('data to be encrypted', 2).then(hash => {
        res.writeHead(200, {'Content-Type': 'text-plain'})
        res.write(hash)
        res.end()
    })
}).listen(1337)

