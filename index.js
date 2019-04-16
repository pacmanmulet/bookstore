const express = require('express');
const config = require('config');
const app = express();

app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || config.get('port');
const server = app.listen(port, () => console.info(`Listening on port ${port}...`));

module.exports = server;
