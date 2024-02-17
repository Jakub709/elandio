const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res, next) => {
  try {
    //const start = Date.now();
    const loggedinUserID = req.session.user._id;
    const userProfile = await User.findById(loggedinUserID);
    let follow = "follow-active";
    let unfollow = "follow-non-active";

    const postsUser = await Post.find({
      postedByID: loggedinUserID,
    }).sort({ createdAt: -1 });
    const followersArray = userProfile.followers;
    const followingsArray = userProfile.following;
    const followers = await User.find({
      _id: { $in: followersArray },
    });
    const followings = await User.find({
      _id: { $in: followingsArray },
    });
    const followersNumber = followersArray.length;
    const followingsNumber = followingsArray.length;
    // const millis = Date.now() - start;
    // console.log(millis);
    res.status(200).render("user-profile", {
      posts: postsUser,
      loggedinUserEqualsClicked: "disabled-button",
      userProfile: userProfile,
      follow: follow,
      unfollow: unfollow,
      followers: followers,
      followings: followings,
      followNumber: followersNumber + followingsNumber,
      followersNumber: followersNumber,
      followingsNumber: followingsNumber,
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
