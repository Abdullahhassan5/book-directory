const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const req = require('express/lib/request');
const hostname = 'localhost';
const port = 3000;
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var bookroute = require('./routes/bookRouter')
app.use('/book', bookroute)

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});