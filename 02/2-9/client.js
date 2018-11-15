//client.js
var net = require('net') ;
var client = net.connect({port: 8080},function(){
  client.name = '客户机1';
  client.write(client.name + ' 上线了！\n');
  client.end(client.name + ' 下线了！\n');
  client.on("data", function(data) {
    console.log(555)
    console.log(data.toString());
  });
});