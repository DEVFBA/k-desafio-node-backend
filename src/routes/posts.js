//Imports
const Messages = require("../models/messages");

//Get posts Angel

// Get Post por id

//Post Posts Angie

//Put Posts David
router.put("/:messageid", auth.validUser, async (req, res) => {
  try {
    const { messageid } = req.params;
    const message = req.body;
    const upMsg = await Messages.findByIdAndUpdate(messageid, message, {
      returnOriginal: false,
    });
    res.status(200).send({ message: "Message sent", data: upMsg });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Delete Posts Sadiel
