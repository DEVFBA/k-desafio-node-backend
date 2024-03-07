require('dotenv').config() // importante hacer esto, o no conecta jajajaja
const express = require('express')
const app = express()
const port = 3002
const mongoDB = require('./src/db/dbM')
const user = require('./src/routes/user')
const post = require('./src/routes/posts')

app.use(express.json())
app.use('/user', user)
app.use('/post', post)
// app.use('/messages', messages)

app.get('/', (req, res) => {
  res.status(200).send('Hey there!')
})

// conectamos la base de datos de mongo en la app, importando
// la funcion desde el archivo que hicimos para ello

mongoDB.connect
  .then((message) => {
    console.log(message)
    app.listen(port, () => {
      console.log(`Server listening on ${port} port.`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
