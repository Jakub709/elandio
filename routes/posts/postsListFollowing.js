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
    // 2) Execute query
    //const start = Date.now();
    const followingArray = req.session.user.following;
    // const query = await Post.find({
    //   postedByID: { $in: followingArray },
    // });
    // const postsCounter = Math.ceil(query.length / 10);
    // const postsCounterLimited = postsCounter >= 10 ? 10 : postsCounter;
    // console.log("Followers");
    // console.log(query.length);
    // console.log(postsCounterLimited);
    const features = new APIFeatures(
      Post.find({
        postedByID: { $in: followingArray },
      }),
      req.query
    )
      .filter()
      .sort()
      .paginate();

    const posts = await features.query;

    const postsCounter = posts.length;
    const currentPage = req.query.page ? Number(req.query.page) : 1;
    const textNext = postsCounter == 10 ? "Následující →" : "";
    const textPrevious =
      req.originalUrl.includes("page=1") || !req.originalUrl.includes("page=")
        ? ""
        : "← Předchozí";
    let url = req.originalUrl.split("&page")[0];
    const checkFilter = url.includes("?");
    if (!checkFilter) {
      url = url + "?";
    }
    // const millis = Date.now() - start;
    // console.log(millis);
    res.status(200).render("posts-list", {
      posts: posts,
      postsCounter: postsCounter,
      currentPage: currentPage,
      textNext: textNext,
      textPrevious: textPrevious,
      url: url,
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
