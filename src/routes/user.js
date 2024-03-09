const express = require('express')
const router = express.Router()
const auth = require('../middlewares/userauth')
const Users = require('../models/model_users')

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Users.findOne({ email: email })
    if (!user || !(await Users.isValidPassword(password, user.password))) {
      res.status(401).send({ message: 'invalid password' })
    } else {
      let { authorization } = req.headers
      const token = await Users.createToken({ _id: user._id, first_name: user.first_name })
      authorization = `Bearer ${token}`
      res.status(201).send({ message: 'login succesful', data: { token: token, userId: user._id } })
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
})



router.post('/', async (req, res) => {
  try {
    let user = req.body
    user.password = await Users.encryptPassword(user.password)
    const newUser = await Users.create(user)
    await newUser.save()
    res.status(201).send({ message:'Success', data: user })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await Users.find()
    res.status(200).send({ message: users })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

router.put('/:id', auth.validUser, async (req, res) => {
  try {
    const { id } = req.params
    const user = req.body
    const updatedUser = Users.findByIdAndUpdate(id, user, {
      returnOriginal: false
    }) // de esta manera busca el user, con el id y lo actualiza
    // await fn.updateUser(id, user)
    res.status(200).send({ message: 'User edited', data: updatedUser })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

router.delete('/:id', auth.validUser, async (req, res) => {
  try {
    const { id } = req.params
    await Users.findByIdAndDelete(id)
    res.status(200).send({ message: 'User deleted' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

module.exports = router
