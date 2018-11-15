//chatClient.js
var net = require('net');
process.stdin.resume();
process.stdin.setEncoding('utf8');
var client = net.connect({port: 8080},function(){
  console.log('【本机提示】登录到聊天室');
  process.stdin.on('data',function(data){
    console.log('client process data')
    client.write(data);
  })
  client.on("data", function(data) {
    console.log('client data')
    console.log(data.toString());
  });
  client.on('end', function() {
    console.log('client end')
    console.log('【本机提示】退出聊天室');
    process.exit();
  });
  client.on('error', function() {
    console.log('client error')
    console.log('【本机提示】聊天室异常');
    process.exit();
  });
});