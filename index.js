var express = require('express');

var app = express();

app.use(express.static('public'));

//loads included files
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));

var server = app.listen(8000, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});

//opens the localhost in Chrome 
const opn = require('opn')
opn('http://localhost:8000', {app: ['google chrome']});