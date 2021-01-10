var express = require('express');
var app = express();
var http = require('http').createServer(app);

var serveStatic = require('serve-static');
var path = require('path');
var port = process.env.PORT || 5000;

/* 
router module
*/
var commonRouter = require('./route/commonRouter');
var serveStatic = require('serve-static');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    limit : '100mb'
    ,extended:true
}));
app.use(bodyParser.json({
    limit : '100mb'
    ,extended:true
}));

app.use(serveStatic(path.join(__dirname, '/dist')));

app.use('/', commonRouter);

var server = http.listen(port, function() {
  console.log("★★★ Server Started ★★★");
});

app.use(function(req,res,next){
  throw new Error(req.url + ' not Found');
});

app.use((err, req, res, next) => { // 404 처리 부분
  console.log("★★★ 404 error ★★★\n",err);
//   res.status(404).redirect('/');
});

module.exports = app;