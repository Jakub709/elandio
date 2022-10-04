const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const User = require("../../schemas/UserSchema");
const AWS = require("aws-sdk");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res, next) => {
  var searchObj = req.query;

  if (req.query.search !== undefined) {
    searchObj = {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { job: { $regex: req.query.search, $options: "i" } },
        { username: { $regex: req.query.search, $options: "i" } },
      ],
    };
  }

  User.find(searchObj)
    .then((results) => res.status(200).send(results))
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
});

// Upload fotografií
require("dotenv").config();
const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

router.post(
  "/profilePicture",
  upload.single("croppedImage"),
  async (req, res, next) => {
    if (!req.file) {
      console.log("No file uploaded with ajax request.");
      return res.sendStatus(400);
    }

    // Problém, pokud aktualizuju github, fotky zmizí,
    //funguje dobře pouze na localhostu

    // var filePath = `/uploads/images/${req.file.filename}.jpeg`;
    // var tempPath = req.file.path;
    // var targetPath = path.join(__dirname, `../../${filePath}`);

    const filePath = `https://ilandio.fra1.digitaloceanspaces.com/${req.file.filename}`;
    const tempPath = req.file.path;
    const blob = fs.readFileSync(tempPath);

    s3.putObject(
      {
        Bucket: process.env.DO_SPACES_NAME,
        Key: req.file.filename,
        Body: blob,
        ACL: "public-read",
        ContentType: "image/jpg",
      },
      (err, data) => {
        if (err) return console.log(err);
        console.log("Your file has been uploaded successfully!", data);
      }
    );

    req.session.user = await User.findByIdAndUpdate(
      req.session.user._id,
      { profilePic: filePath },
      { new: true }
    );
    res.sendStatus(204);

    // fs.rename(tempPath, targetPath, async (error) => {
    // req.session.user = await User.findByIdAndUpdate(
    //   req.session.user._id,
    //   { profilePic: filePath },
    //   { new: true }
    // );
    // res.sendStatus(204);
    // });
  }
);

module.exports = router;
