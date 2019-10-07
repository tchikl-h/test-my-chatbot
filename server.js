const express = require('express')
const app = express()
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('index.html')
})

app.listen(8080, function () {
  console.log('App listening on port 8080!')
})

