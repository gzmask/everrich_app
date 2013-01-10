// everrich SocketStream 0.3.2 app

var http = require('http'),
    express = require('express'),
    ss = require('socketstream');

/*
// Define a single-page client called 'main'
ss.client.define('main', {
  view: 'app.html',
  css:  ['libs/reset.css', 'app.styl'],
  code: ['libs/jquery.min.js', 'app'],
  tmpl: '*'
});
*/

// Define a single-page client called 'index'
ss.client.define('index', {
  view: 'index.html',
  css:  ['libs/reset.css', 'index.css'],
  code: ['libs/jquery.min.js', 'libs/smoothscroll.js'],
  tmpl: '*'
});

// Serve this client on the root URL
ss.http.route('/', function(req, res){
  res.serveClient('index');
});

// Code Formatters
ss.client.formatters.add(require('ss-stylus'));

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets();

// Start web server
var server = http.Server(ss.http.middleware);

if (ss.env === 'production')
  server.listen(80);
else
  server.listen(3000);

// Start SocketStream
ss.start(server);
