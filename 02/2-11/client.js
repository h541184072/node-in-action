const events = require('events')
const net = require('net')
const channel = new events.EventEmitter()

process.stdin.resume()
process.stdin.setEncoding('utf8')

channel.on('send', function (data) {
  console.log('client send')
  client.write(data)
})

const client = net.connect({ port: 8888 }, function () {
  console.log('【本机提示】登录到聊天室')
})

process.stdin.on('data', function (data) {
  channel.emit('send', data)
})

client.on('data', function (data) {
  console.log(data.toString())
})

client.on('close', function () {
  console.log('client close')
  console.log('【本机提示】退出聊天室')
  process.exit()
})