const handler = require('serve-handler')
const http = require('http')


const appconfig = require('./appconfig')

const server = http.createServer((req, res) => {
  return handler(req, res, {
    public: 'dist',
    rewrites: [ { source: '*/*', destination: '/index.html' } ]
  })
})

server.listen(appconfig.server.port)
