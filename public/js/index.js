var http = require('http');
var fs = require('fs');
var path = require('path');


// var contentTypes = {
// 	'html': 'text/html',
// 	'css': 'text/css',
// 	'js': 'application/javascript'
// };

// var server = http.createServer(function(request, response){
// 	var ext = request.url.split('.').pop();
// 	if(contentTypes[ext]){
// 		var filename = request.url.split('/').pop();
// 		fs.readFile(path.join(__dirname, 'static', filename), function(err, str){
// 			response.writeHeader(200, {'Context-Type': contetTypes[ext]});
// 			response.write(str.toString());
// 			response.end();
// 		});
// 	} else {
// 		fs.readFile(path.join(__dirname, 'index.html'), function(err, html){
// 			response.writeHeader(200, {'Context-Type': contentTypes.html});
// 			response.write(html);
// 			response.end();
// 		});
// 	}
// });

// server.listen(8000, function(){
// 	console.log('Loading site');
// })




// http.createServer(function (req, res){
// 	fs.readFile('../index.html', function(err, data){
// 		res.writeHead(200);
// 		// res.writeHead(200, {'Content-Type': 'text/html'});
// 		res.write(data);
// 		res.end();
// 	});
// }).listen(8080, function(){
// 	console.log('loading html');	
// });	


var express = require("express");

var app = express();

app.use(express.static('public'));

//make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
// app.use('/js', express.static(__dirname + '/public/js'));
// app.use('/images', express.static(__dirname + '/public/images'));

var server = app.listen(8081, function(){
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
