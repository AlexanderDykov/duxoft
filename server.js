var express = require('express'),
    server = express();

server.use('/frameworks', express.static(__dirname + '/frameworks') );
server.use('/tools', express.static(__dirname + '/tools') );
server.use('/src', express.static(__dirname + '/src') );
server.use('/res', express.static(__dirname + '/res') );
server.use('/main.js', express.static(__dirname + '/main.js') );
server.use('/project.json', express.static(__dirname + '/project.json') );
server.use('/index.html', express.static(__dirname + '/index.html') );

server.get('/', function(req,res){
    res.sendfile('index.html');
    console.log('Sent index.html');
});

//server.get('/api/hello', function(req,res){
//   res.send('Hello Cruel World');
//});
server.listen(process.env.PORT || 8080);