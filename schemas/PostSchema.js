const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    price: { type: Number, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postedByID: { type: String, required: true },
    postedByName: { type: String, required: true },
    postedByUsername: { type: String, required: true },
    faculty: { type: String },
    type: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, trim: true },
    group: { type: String, trim: true },
    environment: { type: String, trim: true },
    region: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostSchema.virtual("time").get(function () {
  const month = [
    "ledna",
    "února",
    "března",
    "dubna",
    "května",
    "června",
    "července",
    "srpna",
    "září",
    "října",
    "listopadu",
    "prosince",
  ];
  const date = `${this.updatedAt.getDate()}. ${
    month[this.updatedAt.getMonth()]
  }`;
  return date;
});

PostSchema.virtual("facultyNameCSS").get(function () {
  let facultyNameCSS = "";
  if (this.faculty === "") {
    facultyNameCSS = "noFacultyName";
  } else if (this.faculty === "PřF MU") {
    facultyNameCSS = "prirodaMU";
  } else {
    facultyNameCSS = this.faculty.replace(/\s+/g, "").toLowerCase();
  }
  return facultyNameCSS;
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
