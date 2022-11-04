const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/:id", async (req, res, next) => {
  try {
    //const start = Date.now();
    // ID přihlášeného uživatele a kliknutého uživatele
    const clickedUserID = req.params.id;
    const loggedInUserID = req.session.user._id;

    // Test, zdali sledovaný profil != profil přihlášeného
    // kvůli zablokování tlačítek sledovat a zprávy
    const loggedinUserEqualsClicked =
      clickedUserID == loggedInUserID ? "disabled-button" : "active-button";

    const userProfile = await User.findById(clickedUserID);
    let follow;
    let unfollow;
    if (userProfile.followers.includes(loggedInUserID)) {
      follow = "follow-non-active";
      unfollow = "follow-active";
    } else {
      follow = "follow-active";
      unfollow = "follow-non-active";
    }

    const postsUser = await Post.find({
      postedByID: clickedUserID,
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
      loggedinUserEqualsClicked: loggedinUserEqualsClicked,
      userProfile: userProfile,
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
