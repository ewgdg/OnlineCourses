const http = require('http')
const dishRouter = require('./routers/dishRouter')
const express = require('express')
const leaderRouter = require('./routers/leaderRouter')
const promoRouter = require('./routers/promoRouter')

const app = express();
app.use('/dishes', dishRouter)
app.use('/promotions', promoRouter)
app.use('/leaders', leaderRouter)
const server = http.createServer(app)

const port = 3000
const hostname = "localhost"
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
