const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Post = require("../../schemas/PostSchema");
const User = require("../../schemas/UserSchema");
const APIFeatures = require("../../utils/apiFeatures");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    const myPosts = await Post.find({
      postedByUsername: req.session.user.username,
    }).sort({ createdAt: -1 });
    res.status(200).render("my-posts", {
      posts: myPosts,
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
