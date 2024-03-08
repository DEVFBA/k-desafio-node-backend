
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
        const post = await Posts.findById( idReq )

        res.status(200).send({ message: post })
    } catch (error) {
        res.status(400).send({ message: error })
    }
    })



// Get Post por id


//Post Posts Angie


router.post('/', auth.validUser, async (req, res) => {
  try {
    const user = req.user
    let post = req.body
    post.user = user._id
    const newPost = await Posts.create(post)
    res.status(201).send({ message: 'new post created', data: newPost })

  } catch (error) {
        console.log(error)
        res.status(400).send({ message: error })
  }
})

//Put Posts David

router.put("/:postid", auth.validUser, async (req, res) => {
    try {
      const { postid } = req.params;
      const postData = req.body;
      const userIdFromToken = req.user.id;
      console.log("Usuario desde token:", userIdFromToken);
      const existingPost = await Posts.findById(postid);
      console.log("Detalles del Post Existente:", existingPost);
      if (!existingPost) {
        return res.status(404).send({ message: "Post no encontrado" });
      }
      const updatedPost = await Posts.findByIdAndUpdate(postid, postData, {
        new: true,
      });
      console.log("Post actualizado correctamente:", updatedPost);
      res
        .status(200)
        .send({ message: "Post actualizado correctamente", data: updatedPost });
    } catch (error) {
      console.error("Error al actualizar el post:", error.message);
      res
        .status(400)
        .send({ message: "Error al actualizar el post", error: error.message });
    }
  });


// Delete Posts Sadiel
router.delete('/:id_post', async (req, res) => {
    try {
        const { id_author } = req.headers
        const { id_post} = req.params
        const todelete = await Posts.findById(id_post)
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









// Delete Posts Sadiel

module.exports = router;

