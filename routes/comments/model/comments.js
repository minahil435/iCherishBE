const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: String,
    creatorName: String,
    creatorImage: {
        type: String,
    },
    creatorEmail: {
        type:String,
        unique: true
    },
    CreatedAt: {
        type: Date,
        default: new Date()
    },
});

module.exports = mongoose.model("comment", CommentSchema);
