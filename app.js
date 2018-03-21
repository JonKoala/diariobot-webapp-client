const path = require('path')
const express = require('express');
var app = express();

const yaml = require('js-yaml');
const fs = require('fs');
const appconfig = yaml.safeLoad(fs.readFileSync('appconfig.yml'));

app.use(express.static('dist'));

app.get(/.+\.\w+$/, function(req, res) {
  //requesting an unexisting file
  res.status(404).send();
});

app.get('*', function(req, res) {
  res.sendFile('index.html');
});

var port = appconfig.server.port;
app.listen(port, () => {
  console.log('Client up and running! Listening on ' + port + '...')
})
