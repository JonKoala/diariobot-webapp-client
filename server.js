const handler = require('serve-handler')
const http = require('http')


const app = http.createServer((req, res) => {
  return handler(req, res, {
    public: 'dist',
    rewrites: [ { source: '*/*', destination: '/index.html' } ]
  })
})

const port = process.env['DIARIOBOT_CLIENT_PORT']
app.listen(port, function() {
  console.log('Server up and running! Listening on ' + port + '...')
})
