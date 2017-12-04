var express = require('express');
var app = express();

var yaml = require('js-yaml');
var fs = require('fs');
var appconfig = yaml.safeLoad(fs.readFileSync('appconfig.yml'));

app.use(express.static(__dirname));

app.get(/.+\.\w+$/, function(req, res) {
  //requesting an unexisting file
  res.status(404).send();
});

app.get('*', function(req, res) {
  res.sendFile('index.html', { root : __dirname});
});

var port = appconfig.server.port;
app.listen(port, () => {
  console.log('Client up and running! Listening on ' + port + '...')
})
