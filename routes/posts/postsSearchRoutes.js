const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Post = require("../../schemas/PostSchema");
const APIFeatures = require("../../utils/apiFeatures");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res) => {
  try {
    const start = Date.now();
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

    const features = new APIFeatures(
      Post.find(searchObj).populate("postedBy"),
      req.query
    )
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
    const faculty = req.session.user.faculty;
    let color;
    if (faculty === "ESF MU") {
      color = "#C50069";
    } else if (faculty === "FaF MU") {
      color = "#527488";
    } else if (faculty === "FF MU") {
      color = "#5CB4E1";
    } else if (faculty === "FI MU") {
      color = "#F7BB31";
    } else if (faculty === "FSpS MU") {
      color = "#74B8AA";
    } else if (faculty === "FSS MU") {
      color = "#3D885A";
    } else if (faculty === "LF MU") {
      color = "#C62326";
    } else if (faculty === "PdF MU") {
      color = "#CE661D";
    } else if (faculty === "PrF MU") {
      color = "#8F448E";
    } else if (faculty === "PřF MU") {
      color = "#5AA353";
    } else {
      color = "#1165BF";
    }
    const millis = Date.now() - start;
    console.log(millis);
    res.status(200).render("posts-list", {
      posts: posts,
      postsCounter: postsCounter,
      currentPage: currentPage,
      textNext: textNext,
      textPrevious: textPrevious,
      url: url,
      user: req.session.user,
    });
  } catch (err) {
    res.status(404).render("error");
  }
});

module.exports = router;
