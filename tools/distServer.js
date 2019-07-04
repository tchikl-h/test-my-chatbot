import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.dev';
import { exec } from 'child_process';

const bundler = webpack(config);

const express = require('express');
const port = 3000;
const app = express();

var server = require('http').Server(app);

const io = require('socket.io').listen(server);
io.set('origins', 'http://localhost:3000');
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(historyApiFallback());

app.use(webpackDevMiddleware(bundler, {
  publicPath: config.output.publicPath,
  noInfo: false,
  quiet: false,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
}));

app.use(express.static(__dirname + '/src/*.html'));

server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  // console.info('-Launching all the containers-');
  // exec(`docker start $(docker ps -aq)`, (err, stdout, stderr) => {
  //   if (err)
  //     console.log(err);
  //   else
  //     console.log("Docker container successfully launched !")
  // });
});

function shutDown() {
  console.log("distServer");
  // console.log('Received kill signal, shutting down gracefully');
  // io.emit('disconnect');
  process.exit(0);
}

var userId = 1;
var userCount = 0;

io.on('connect', function(socket){
  
  socket.on('user:request', () => {
    userCount++;
    socket.emit('user:accept', { id : userId, users : userCount });
    console.log("before userId : "+userId);
    userId++;
    console.log("after userId : "+userId);
    socket.broadcast.emit('user:join');
    console.log("someone joined");
  });

  // 1) receive bot
  socket.on('send:message:bot', function(msg) {
    // 2) send bot
    io.emit('send:message:bot', msg);
    console.log(" => " + msg.text);
  });

  // 1) receive user
  socket.on('send:message', function(msg) {
    // 2) send user
    io.emit('send:message', msg);
    console.log(" => " + msg.text);
  });

  socket.on('disconnect', function(msg) {
    socket.broadcast.emit('user:left', msg);
    userCount--;
    console.log("before userId : "+userId);
    if (userId > 0)
      userId--;
    console.log("after userId : "+userId);
    console.log("someone left");
  })
});