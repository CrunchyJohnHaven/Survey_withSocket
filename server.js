var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs')
;
app.get('/', function(req,res){
    console.log("get root route");
    res.render('index');
})
app.post('/result', function(req,res){
    console.log("POST DATA \n\n", req.body)
    res.redirect('/results');
});
app.get('/results', function(req,res){
    res.render('result')
})

var server = app.listen(8000, function(){
    console.log('SOCKET PROJECT listening on port 8000');
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
    console.log('Client/socket is connected');
    console.log('Client/socket id is: ', socket.id);
    //all server socket code here
    socket.on('form_submit', function(data){
        console.log('form submitted' + data);
        result = {
            number: Math.floor(Math.random()*1000),
            form:data
    }
        socket.emit('server_response', result);
    })
})

