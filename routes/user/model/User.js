const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName:{
    type: String
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  post: [{ type: mongoose.Schema.ObjectId, ref: "memory" }],
  userImage: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);