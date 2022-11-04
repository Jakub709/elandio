const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Post = require("../../schemas/PostSchema");
const User = require("../../schemas/UserSchema");
const APIFeatures = require("../../utils/apiFeatures");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    const myPosts = await Post.find({
      postedByUsername: req.session.user.username,
    }).sort({ createdAt: -1 });

    res.status(200).render("my-posts", {
      title: "Všechny moje příspěvky",
      posts: myPosts,
    });
  } catch (err) {
    res.status(404).render("my-posts");
  }
});

router.post("/", async (req, res, next) => {
  try {
    const postData = {
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      postedByName: req.session.user.name,
      postedByID: req.session.user._id,
      postedByUsername: req.session.user.username,
      postedByProfilePic: req.session.user.profilePic,
      type: req.body.type,
      category: req.body.category,
      level: req.body.level,
      group: req.body.group,
      environment: req.body.environment,
    };
    //Ochrana před vložením příspěvku od neautorizovaného uživatele
    if (req.session.user.acctivated === "yes") {
      //console.log(req.session.user.acctivated);
      let newPost = await Post.create(postData);
      res.status(201).send({
        newPost: newPost,
        status: "success",
      });
    } else {
      res.status(201).send({
        status: "fail",
        errorMessage:
          "Tvůj účet není aktivní. Přihlas se na email a aktivuj jej pomocí odkazu, který Ti byl při registraci odeslán. ",
      });
    }
  } catch (err) {
    res.status(400).send({
      status: "fail",
      errorMessage: "Něco se porouchalo, zkuste to prosím znovu :-)",
    });
  }
});

module.exports = router;
