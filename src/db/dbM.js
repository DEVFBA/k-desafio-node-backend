const mongoose = require('mongoose')
// const URI = 'mongodb+srv://kodemia:kodemia@gen31js.ng7osxl.mongodb.net/gen31-js'
const URI = 'mongodb+srv://angelagar:Ayd091388@clusterkodemia31.6jkc48j.mongodb.net/Kodemia31'

const connect = new Promise(async (resolve, reject) => {
  const conn = mongoose.connect(URI)
  if (conn) resolve('Connection succesfully.')
  reject(new Error('Error connection failed'))
})

module.exports = {
  connect
}
