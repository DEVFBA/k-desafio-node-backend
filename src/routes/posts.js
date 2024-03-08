//Imports

const express = require('express')
const router = express.Router()
const Users = require('../models/model_users')
const auth = require('../middlewares/userauth')
const Posts = require('../models/model_posts')


//Get posts Angel

router.get('/', async (req, res) => {

  try{

    const posts = await Posts.find();
    console.log(posts);
    res.send({message: 'OK', data: posts});

  } catch {

  }

})


// Get Post por id Sadiel
router.get('/:id', async (req, res) => {
    try {
        const idReq  = req.params.id
        const post = await Posts.findById( idReq )
        res.status(200).send({ message: post })
    } catch (error) {
        res.status(400).send({ message: error })
    }
    })


// Get Post por id

//Post Posts Angie

router.post('/:userid', async (req, res) => {
  try {
    const { userid } = req.params
    let post = req.body
    post.user = userid
    const newPost = await Posts.create(post)
    res.status(201).send({ message: 'new post created', data: newPost })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error })
  }
})

//Put Posts David






// Delete Posts Sadiel


module.exports = router;
