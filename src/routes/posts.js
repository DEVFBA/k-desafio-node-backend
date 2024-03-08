//Imports

const express = require("express");
const router = express.Router();
const Users = require("../models/model_users");
const auth = require("../middlewares/userauth");
const Posts = require("../models/model_posts");

//Get posts Angel

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    console.log(posts);
    res.send({ message: "OK", data: posts });
  } catch {}
});

// Get Post por id Sadiel
router.get("/:id", async (req, res) => {
  try {
    const idReq = req.params.id;
    const post = await Posts.findById(idReq);
    res.status(200).send({ message: post });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Get Post por id

//Post Posts Angie

router.post("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    let post = req.body;
    post.user = userid;
    const newPost = await Posts.create(post);
    res.status(201).send({ message: "new post created", data: newPost });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
});

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

module.exports = router;
