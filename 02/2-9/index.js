//server.js
var net = require('net') ;
var server = net.createServer(function(socket) {
  socket.write("Hi!\n");
  socket.on("data", function(data) {
    console.log(222)
    console.log(data.toString());
  });
  socket.on("end", function() {
    console.log(333)
    console.log('有客户机下线了！！！');
  });
  socket.on('error', function() {
    console.log(444)
    console.log('发生意外错误！！！');
  });
}) ;
server.listen(8080) ;