const Watcher = require('./Watcher')
const fs = require('fs')

const watchDir = './formDir'
const processDir = './toDir'

const watcher = new Watcher(watchDir, processDir)

watcher.on('process', (file) => {
  const watchFile = `${watchDir}/${file}`
  const processFile = `${processDir}/${file.toLowerCase()}`
  console.log('process')
  console.log(watchFile)
  console.log(processFile)
  fs.rename(watchFile, processFile, err => {
    console.log('rename')
    if (err) throw err
  })
})

watcher.start()