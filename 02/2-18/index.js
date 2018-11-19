const fs = require('fs')
const tasks = []
const wordCounts = {}
const filesDir = './text'
let completeTasks = 0

function checkIfComplete() {
  completeTasks++
  if (completeTasks === tasks.length) {
    for (let index in wordCounts) {
      console.log(`${index}:${wordCounts[index]}`)
    }
  }
}

function addWordCount(word) {
  wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1
}

function countWordsInText(text) {
  const words = text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort()

  words
    .filter(word => word)
    .forEach(word => addWordCount(word))
}

fs.readdir(filesDir, (err, files) => {
  if (err) throw err
  files.forEach(file => {
      const task = (file => {
        console.log(333)
        console.log(file)
        return () => {
          fs.readFile(file, (err, text) => {
            if (err) throw err
            countWordsInText(text)
            checkIfComplete()
          })
        }
      })(`${filesDir}/${file}`)
      tasks.push(task)
    }
  )
  tasks.forEach(task => task())
})
