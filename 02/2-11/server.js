const events = require('events')
const net = require('net')
const channel = new events.EventEmitter()

channel.clients = {}
channel.subscriptions = {}

channel.on('join', function (id, client) {
  this.clients[id] = client
  this.subscriptions[id] = (senderId, message) => {
    if (id !== senderId) {
      this.clients[id].write(message)
    }
  }
  this.on('broadcast', this.subscriptions[id])
})

channel.on('leave', function (id) {
  this.removeListener('broadcast', this.subscriptions[id])
  this.emit('broadcast', id, `${id} has left the chatroom.\n`)
})

const server = net.createServer(client => {
  console.log('server')
  console.log('remoteAddress:' + client.remoteAddress)
  console.log('remotePort:' + client.remotePort)
  const id = `${client.remoteAddress}:${client.remotePort}`
  channel.emit('join', id, client)
  client.on('data', data => {
    data = data.toString()
    channel.emit('broadcast', id, data)
  })
  client.on('close', () => {
    channel.emit('leave', id)
  })
})

server.listen(8888)