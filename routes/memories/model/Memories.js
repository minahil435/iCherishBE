const mongoose = require("mongoose");

const MemorySchema = new mongoose.Schema({
    title: String,
    message:String,
    creatorName: {
        type: String,
    },
    creatorEmail: {
        type: String,
    },
    momoryImage: {
        type: String,
    },
    category: {
        type: String,
    },
    LikeCount:{
        type: Number,
        default: 0
    },
    CreatedAt:{
        type:Date,
        default : new Date()
    },
    comments: [{ type: mongoose.Schema.ObjectId, ref: "comment" }],
});

module.exports = mongoose.model("memory", MemorySchema);
