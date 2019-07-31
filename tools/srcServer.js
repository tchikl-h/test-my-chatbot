import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.dev';

const bundler = webpack(config);

const express = require('express');
const port = 3000;
const app = express();

var server = require('http').Server(app);

const io = require('socket.io').listen(server, { origins: '*:*'});
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
  console.log("srcServer");
  // console.log('Received kill signal, shutting down gracefully');
  // io.emit('disconnect');
  process.exit(0);
}

io.sockets.on('connection', function(socket) {
  console.log("Server : on.connection");
  socket.on('room', function(room) {
    console.log("Server : on.room "+room);
      socket.join(room, () => {
        console.log("Server : joined room "+room);

        socket.in(room).on('start:recording', function() {
          console.log("srcServer start:recording")
          io.sockets.in(room).emit('start:recording');
        });

        socket.in(room).on('stop:recording', function() {
          console.log("srcServer stop:recording")
          io.sockets.in(room).emit('stop:recording');
        });

        // 1) receive bot
        socket.in(room).on('send:message:bot', function(data) {
          console.log("Server : on.send:message:bot on room "+room);
          // 2) send bot
          io.sockets.in(room).emit('send:message:bot', {
            msg: data.msg
          });
          console.log(" => " + data.msg.text);
        });

        socket.in(room).on('logs', function(data) {
          console.log("Server : on.logs on room "+room);
          // 2) send bot
          io.sockets.in(room).emit('logs', {
            test: data
          });
          console.log(data);
        });
      
        // 1) receive user
        socket.in(room).on('send:message:user', function(data) {
          console.log("Server : on.send:message:user on room "+room);
          // 2) send user
          io.sockets.in(room).emit('send:message:user', {
            msg: data.msg
          });
          console.log(" => " + data.msg.text);
          // TODO : add else "oups could not make chatbot connection"
        });
      });
  });
});