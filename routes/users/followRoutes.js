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
    //const start = Date.now();
    const clickedUserID = req.params.id;
    const loggedinUserID = req.session.user._id;
    let clickedUser = await User.findById(clickedUserID);

    // Deklarace proměnných kvůli if
    // celé to dělám pouze kvůli tomu, když refresnu stránku s
    // http://localhost:3333/follow/628f1f0d03dfdcaf73fae882
    // nechci opětovné přidání uživatele

    let loggedinUser;
    let postsUser;
    let follow;
    let unfollow;
    let followersArray;
    let followingsArray;
    let followers;
    let followings;
    let followersNumber;
    let followingsNumber;
    //
    if (!clickedUser.followers.includes(loggedinUserID)) {
      loggedinUser = await User.findByIdAndUpdate(
        loggedinUserID,
        {
          $push: {
            following: clickedUserID,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      clickedUser = await User.findByIdAndUpdate(
        clickedUserID,
        {
          $push: {
            followers: loggedinUserID,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      postsUser = await Post.find({
        postedByID: clickedUserID,
      }).sort({ createdAt: -1 });
      follow = "follow-non-active";
      unfollow = "follow-active";
      followersArray = clickedUser.followers;
      followingsArray = clickedUser.following;
      followers = await User.find({
        _id: { $in: followersArray },
      });
      followings = await User.find({
        _id: { $in: followingsArray },
      });
      followersNumber = followersArray.length;
      followingsNumber = followingsArray.length;
    } else {
      loggedinUser = await User.findById(loggedinUserID);
      postsUser = await Post.find({
        postedByID: clickedUserID,
      }).sort({ createdAt: -1 });
      follow = "follow-non-active";
      unfollow = "follow-active";
      followersArray = clickedUser.followers;
      followingsArray = clickedUser.following;
      followers = await User.find({
        _id: { $in: followersArray },
      });
      followings = await User.find({
        _id: { $in: followingsArray },
      });
      followersNumber = followersArray.length;
      followingsNumber = followingsArray.length;
    }
    // const millis = Date.now() - start;
    // console.log(millis);
    res.status(200).render("user-profile", {
      posts: postsUser,
      loggedinUserEqualsClicked: "",
      userProfile: clickedUser,
      follow: follow,
      unfollow: unfollow,
      followers: followers,
      followings: followings,
      followersNumber: followersNumber,
      followingsNumber: followingsNumber,
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
