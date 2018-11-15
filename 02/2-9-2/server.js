//chatServer.js
var net = require('net');
var i = 0;
//保存客户机
var clientList = [];
var server = net.createServer(function(socket) {
  socket.name = '用户' + (++i);
  socket.write('【聊天室提示】欢迎' + socket.name + '\n');
  //更新客户机数组
  clientList.push(socket);
  function showClients(){
    console.log('【当前在线用户】：');
    for(var i=0;i<clientList.length;i++) {
      console.log(clientList[i].name);
    }
  }
  showClients();
  socket.on("data", function(data) {
    console.log('server data')
    //把当前连接的客户机的信息转发到其他客户机
    for(var i=0;i<clientList.length;i++) {
      if(socket !== clientList[i]) {
        clientList[i].write('【' + socket.name + '】：' + data);
      }
    }
  });
  socket.on("close", function() {
    console.log('server close')
    //当前客户机下线时，将其从客户机数组中移除
    clientList.splice(clientList.indexOf(socket), 1);
    showClients();
  });
  socket.on('error', function(err) {
    console.log('server error')
    console.log(socket.name + '退出');
  });
});
server.listen(8080) ;