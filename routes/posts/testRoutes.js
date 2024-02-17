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
  res.status(200).render("posts-list-test");
});

require("dotenv").config();
const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

router.post("/", upload.single("croppedImage"), async (req, res, next) => {
  if (!req.file) {
    console.log("No file uploaded with ajax request.");
    return res.sendStatus(400);
  }

  const filePath = `https://elandio.fra1.cdn.digitaloceanspaces.com/${req.file.filename}`;
  const tempPath = req.file.path;
  const blob = fs.readFileSync(tempPath);

  s3.putObject(
    {
      Bucket: process.env.DO_SPACES_NAME,
      Key: req.file.filename,
      Body: blob,
      ACL: "public-read",
      ContentType: "image/jpeg",
    },
    (err, data) => {
      if (err) return console.log(err);
      console.log("Your file has been uploaded successfully!", data);
    }
  );
});

module.exports = router;
