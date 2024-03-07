//Imports
const express = require('express')
const router = express.Router()
const dbpost = require ()






//Get posts Angel








// Get Post por id Sadiel
router.get('/:id', async (req, res) => {
    try {
        const idReq  = req.params.id
        const post = await dbpost.findById( idReq )
        res.status(200).send({ message: post })
    } catch (error) {
        res.status(400).send({ message: error })
    }
    })














//Post Posts Angie











//Put Posts David













// Delete Posts Sadiel











module.exports = router