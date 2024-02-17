const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Post = require("../../schemas/PostSchema");
const User = require("../../schemas/UserSchema");
const Admin = require("../../schemas/AdminSchema");
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
      postedBy: req.session.user,
      postedByID: req.session.user._id,
      postedByName: req.session.user.name,
      postedByUsername: req.session.user.username,
      faculty: req.session.user.faculty,
      type: req.body.type,
      category: req.body.category,
      level: req.body.level,
      group: req.body.group,
      environment: req.body.environment,
    };
    //Ochrana před vložením příspěvku od neautorizovaného uživatele
    if (req.session.user.acctivated === "yes") {
      const userUpdated = await User.findByIdAndUpdate(
        req.session.user._id,
        { $inc: { postsCounter: 1 } },
        {
          new: true,
          runValidators: true,
        }
      );
      let newPost = await Post.create(postData);
      req.session.user = userUpdated;

      //admin data
      const adminData = await Admin.findByIdAndUpdate(
        "659e9fd6213e43b164a1ef3b",
        {
          $push: {
            dateNewPosts: new Date(),
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

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
