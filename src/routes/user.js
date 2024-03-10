const express = require('express');
const router = express.Router();
const {
  validUser
} = require('../middlewares/userauth');
const Users = require('../models/model_users');

router.post('/', async (req, res) => {

  try {

    let user = req.body;

    user.password = await Users.encryptPassword(user.password);

    const newUser = await Users.create(user);

    await newUser.save();
    res.status(201).send({ 
      message:'Success', 
      data: user
    })

  } catch (error) {

    console.log(error);

    res.status(400).send({ 
      message: 'Error: Please contact you system administrator',
      data: error 
    });

  }
})

router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });

    if(!email || !password){

      res.status(400).send({
        message: 'Email and Password are Required',
        data: null
      })

      return;

    }

    if (!user || !(await Users.isValidPassword(password, user.password))) {

      res.status(401).send({ 
        message: 'Invalid password',
        data: null
      });

    } else {

      const token = await Users.createToken({ 
        _id: user._id, 
        first_name: user.first_name 
      });

      authorization = `Bearer ${token}`;
      res.status(201).send({ 
        message: 'Login Successful', 
        data: { token: token, userId: user._id } 
      });

    }
  } catch (error) {

    console.log(error);

    res.status(400).send({ 
      message: 'Error: Please contact your System Administrator', 
      data: null });

  }
})

router.get('/', async (req, res) => {

  try {

    const users = await Users.find();

    res.status(200).send({ message: users });

  } catch (error) {

    res.status(400).send({ message: error });

  }

})

router.put('/:id', validUser, async (req, res) => {

  try {

    const { id } = req.params;
    const user = req.body;
    const updatedUser = Users.findByIdAndUpdate(id, user, { returnOriginal: false });

    res.status(200).send({ 
      message: 'User edited', 
      data: updatedUser 
    });

  } catch (error) {

    res.status(400).send({ 
      message: 'Error: Please contact your Systema Administrator',
      data: null 
    });

  }
})

router.delete('/:id', validUser, async (req, res) => {

  try {

    const { id } = req.params;
    
    await Users.findByIdAndDelete(id);
    
    res.status(200).send({ 
      message: 'User deleted', 
      data: null 
    });

  } catch (error) {
    
    res.status(400).send({ 
      message: 'Error: Please contact your systema administrator',
      data: null 
    });
  
  }
})

module.exports = router;