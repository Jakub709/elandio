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

    const loggedinUser = await User.findByIdAndUpdate(
      loggedinUserID,
      {
        $pull: {
          following: clickedUserID,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    const unFollowedUser = await User.findByIdAndUpdate(
      clickedUserID,
      {
        $pull: {
          followers: loggedinUserID,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    const postsUser = await Post.find({
      postedByID: clickedUserID,
    }).sort({ createdAt: -1 });
    const follow = "follow-active";
    const unfollow = "follow-non-active";
    const followersArray = unFollowedUser.followers;
    const followingsArray = unFollowedUser.following;
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
      loggedinUserEqualsClicked: "",
      userProfile: unFollowedUser,
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
