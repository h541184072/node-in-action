const fs = require('fs')

process.on('uncaughtException', (err) => {
  console.log(333333)
  fs.writeSync(1, `Caught exception: ${err}\n`)
})

setTimeout(() => {
  console.log('This will still run.')
}, 500)

// Intentionally cause an exception, but don't catch it.
nonexistentFunc()
console.log('This will not run.')