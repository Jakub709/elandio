const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Post = require("../../schemas/PostSchema");
const APIFeatures = require("../../utils/apiFeatures");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    let searchObj = req.query;

    if (req.query.search !== undefined) {
      searchObj = {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { postedByName: { $regex: req.query.search, $options: "i" } },
          { category: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }

    const features = new APIFeatures(Post.find(searchObj), req.query)
      .filter()
      .sort()
      .limitFields()
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
