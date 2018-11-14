const fs = require('fs')
const zlib = require('zlib')
const gzip = zlib.createGzip()
const outStream = fs.createWriteStream('output.js.gz')

fs.createReadStream('./01-01-stream.js')
.pipe(gzip)
.pipe(outStream)

//使用核心模块和流
//
// (页码11).