

//Imports
const express = require('express')
const router = express.Router()
const Posts = require('../models/model_posts')







//Get posts Angel
router.get('/', async (req, res) => {
    try {
        const post = await Posts.find()
        res.status(200).send(post)
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: error })
    }
    })

// Get Post por id Sadiel
router.get('/:id', async (req, res) => {
    try {
        const idReq  = req.params.id
        const post = await Post.findById( idReq )
        res.status(200).send({ message: post })
    } catch (error) {
        res.status(400).send({ message: error })
    }
    })



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
router.delete('/:id_post', async (req, res) => {
    try {
        const { id_author } = req.headers
        const { id_post} = req.params
        const todelete = await Post.findById(id_post)
        if (todelete.user == id_author) {
            await Post.findByIdAndDelete(id_post)
            res.status(200).send({ message: 'Post deleted' })
        }
        else {
            res.status(400).send({message: 'Only author can delete a post'})
        }
    } catch (error) {
        res.status(400).send({ message: error })
    }
    })











module.exports = router
