const http = require('http')
const port = 3001


const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Fuck yeahh!')
}


const server = http.createServer(requestHandler)


server.listen(port, (err) => {
  if (err) {
    return console.log('You suck, try again!', err)
  }
  console.log('Server is listening on $(port)')
})
