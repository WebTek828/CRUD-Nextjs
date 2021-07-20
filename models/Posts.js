const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  creator: {
    username: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.models.Post || mongoose.model("Post", postsSchema);
