const fs = require("fs");
const mongoose = require("mongoose");
const Post = require("./schemas/postSchema");

const DB =
  "mongodb+srv://JakubSolnicka:bubicekakropolis709@akropoliscluster.brkoy.mongodb.net/dataDB?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB importData connection successful!"));

// READ JSON FILE
const posts = JSON.parse(fs.readFileSync("./posts-simple.json", "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Post.create(posts);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Post.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
